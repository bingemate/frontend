import { Component, OnInit } from '@angular/core';
import { grpc } from '@improbable-eng/grpc-web';
import { Request } from '@improbable-eng/grpc-web/dist/typings/invoke';
import { VideoRequest, VideoResponse } from '../../../proto/video_pb';
import { VideoService } from '../../../proto/video_pb_service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface VideoChunk {
  chunk: Uint8Array;
  startTime: number;
  endTime: number;
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
})
export class VideoPlayerComponent implements OnInit {
  private grpcClient?: Request;
  private metadata?: Uint8Array;
  private chunks: VideoChunk[] = [];
  private sourceBuffer?: SourceBuffer;
  private media = new MediaSource();
  private lastClear = 0;
  private quotaExceeded = false;
  videoUrl?: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(this.media)
    );
    this.loadChunks(1);
    this.media.addEventListener('sourceopen', () => {
      this.createSourceBuffer();
      this.media.duration = 1385;
      if (this.metadata) {
        this.sourceBuffer?.appendBuffer(this.metadata);
      }
    });
  }

  setCurrentTime(event: Event) {
    const currentTime = (event.target as HTMLMediaElement).currentTime;
    if (
      currentTime - 60 > 0 &&
      currentTime - 60 > this.lastClear &&
      this.quotaExceeded &&
      !this.sourceBuffer?.updating
    ) {
      this.sourceBuffer?.remove(this.lastClear, currentTime - 60);
      this.lastClear = currentTime - 60;
      this.quotaExceeded = false;
    }
  }

  seekVideo(event: Event) {
    const currentTime = (event.target as HTMLMediaElement).currentTime;
    if (
      !this.sourceBuffer ||
      (this.sourceBuffer.buffered.length !== 0 &&
        this.sourceBuffer.buffered.start(0) <= currentTime &&
        this.sourceBuffer.buffered.end(0) > currentTime)
    ) {
      return;
    }
    this.lastClear = 0;
    this.grpcClient?.close();
    this.chunks = [];
    if (this.sourceBuffer.buffered.length > 0) {
      this.sourceBuffer.abort();
      this.sourceBuffer.remove(
        this.sourceBuffer.buffered.start(0),
        this.sourceBuffer.buffered.end(0)
      );
    }
    this.loadChunks(1, currentTime);
  }

  private createSourceBuffer() {
    this.sourceBuffer = this.media.addSourceBuffer(
      'video/mp4; codecs="mp4a.40.2, hvc1.1.6.L120.90"'
    );
    this.sourceBuffer.mode = 'segments';
    this.sourceBuffer.addEventListener('updateend', () => {
      const chunk = this.chunks.shift();
      if (chunk) {
        this.appendChunk(chunk);
      }
    });
  }

  private loadChunks(id: number, seek?: number): void {
    const videoRequest = new VideoRequest();
    videoRequest.setVideoId(id);
    if (seek) {
      videoRequest.setSeek(seek);
    }
    this.grpcClient = grpc.invoke(VideoService.GetVideoStream, {
      request: videoRequest,
      host: `http://localhost:50051`,
      onMessage: (message: VideoResponse) => {
        if (message.getData_asU8().length > 0) {
          const chunk: VideoChunk = {
            chunk: message.getData_asU8(),
            startTime: message.getStarttime(),
            endTime: message.getEndtime(),
          };
          if (
            this.sourceBuffer &&
            !this.sourceBuffer.updating &&
            this.chunks.length === 0
          ) {
            this.appendChunk(chunk);
          } else {
            this.chunks.push(chunk);
          }
        }
        if (message.getMetadata_asU8().length > 0) {
          if (
            this.sourceBuffer &&
            !this.sourceBuffer.updating &&
            this.chunks.length === 0
          ) {
            this.sourceBuffer.appendBuffer(message.getMetadata_asU8());
          } else {
            this.metadata = message.getMetadata_asU8();
          }
        }
      },
      onEnd: (
        code: grpc.Code,
        msg: string | undefined,
        trailers: grpc.Metadata
      ) => {
        this.grpcClient = undefined;
        if (code == grpc.Code.OK) {
          console.log('request finished wihtout any error');
        } else {
          console.log('an error occured', code, msg, trailers);
        }
      },
    });
  }

  private appendChunk(chunk: VideoChunk): void {
    try {
      this.sourceBuffer?.appendBuffer(chunk.chunk);
    } catch (e) {
      if ((e as Error).name !== 'QuotaExceededError') {
        throw e;
      }
      this.chunks = [chunk, ...this.chunks];
      this.quotaExceeded = true;
    }
  }
}
