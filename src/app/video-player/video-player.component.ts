import {Component, OnInit} from '@angular/core';
import {grpc} from "@improbable-eng/grpc-web";
import {Request} from "@improbable-eng/grpc-web/dist/typings/invoke";
import {VideoRequest, VideoResponse} from "../generated/proto/video_pb";
import {VideoService} from "../generated/proto/video_pb_service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

interface VideoChunk {
  chunk: Uint8Array;
  startTime: number;
  endTime: number;
}

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  private grpcClient?: Request;
  private metadata?: Uint8Array;
  private chunks: VideoChunk[] = [];
  private sourceBuffer?: SourceBuffer;
  private media = new MediaSource();
  private lastClear = 0;
  private quotaExceeded = false;
  private loading = false;
  videoUrl?: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.media));
    this.loadChunks(1);
    this.media.addEventListener("sourceopen", () => {
      this.createSourceBuffer();
      this.media.duration = 256;
      if (this.metadata) {
        this.sourceBuffer?.appendBuffer(this.metadata);
      }
    });
  }

  setCurrentTime(event: Event) {
    const currentTime = (event.target as HTMLMediaElement).currentTime;
    if (currentTime - 60 > 0 && currentTime - 60 > this.lastClear && this.quotaExceeded) {
      this.sourceBuffer?.remove(this.lastClear, currentTime - 60);
      this.lastClear = currentTime - 60;
      this.quotaExceeded = false;
    }
  }

  seekVideo(event: Event) {
    const currentTime = (event.target as HTMLMediaElement).currentTime;
    this.grpcClient?.close();
    this.chunks = [];
    if (this.sourceBuffer) {
      for (let i = 0; i < this.sourceBuffer.buffered.length; i++) {
        if (this.sourceBuffer.buffered.start(i) <= currentTime && this.sourceBuffer.buffered.end(i) >= currentTime) {
          this.loading = true;
          this.loadChunks(1, this.sourceBuffer.buffered.end(i));
          return;
        }
      }
      this.loading = true;
      this.loadChunks(1, currentTime);
    }
  }

  private createSourceBuffer() {
    this.sourceBuffer = this.media.addSourceBuffer('video/mp4; codecs="mp4a.40.2, hvc1.1.6.L120.90"');
    this.sourceBuffer.mode = "segments";
    this.sourceBuffer.addEventListener("updateend", () => {
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
        if (this.sourceBuffer && this.loading) {
          this.loading = false;
          this.sourceBuffer.abort();
          this.sourceBuffer.timestampOffset = message.getStarttime();
        }
        if (message.getData_asU8().length > 0) {
          const chunk: VideoChunk = {
            chunk: message.getData_asU8(),
            startTime: message.getStarttime(),
            endTime: message.getEndtime()
          }
          if (this.sourceBuffer && !this.sourceBuffer.updating && this.chunks.length === 0) {
            this.appendChunk(chunk);
          } else {
            this.chunks.push(chunk);
          }
        }
        if (message.getMetadata_asU8().length > 0) {
          if (this.sourceBuffer && !this.sourceBuffer.updating && this.chunks.length === 0) {
            this.sourceBuffer.appendBuffer(message.getMetadata_asU8());
          } else {
            this.metadata = message.getMetadata_asU8();
          }
        }
      },
      onEnd: (code: grpc.Code, msg: string | undefined, trailers: grpc.Metadata) => {
        // This section works when server close connection.

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