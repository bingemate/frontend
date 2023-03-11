import {Component, OnInit} from '@angular/core';
import {grpc} from "@improbable-eng/grpc-web";
import {Request} from "@improbable-eng/grpc-web/dist/typings/invoke";
import {VideoRequest, VideoResponse} from "../generated/proto/video_pb";
import {VideoService} from "../generated/proto/video_pb_service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {
  private grpcClient?: Request;
  private chunks: Uint8Array[] = [];
  private sourceBuffer?: SourceBuffer;
  private media = new MediaSource();
  private lastClear = 0;
  private quotaExceeded= false;
  videoUrl?: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    const videoRequest = new VideoRequest();
    videoRequest.setVideoId(5);
    this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.media));
    this.media.addEventListener("sourceopen", () => {
      this.sourceBuffer = this.media.addSourceBuffer('video/mp4; codecs="mp4a.40.2, hvc1.1.6.L120.90"');
      this.sourceBuffer.addEventListener("updateend", () => {
        const chunk = this.chunks.shift();
        if (chunk) {
          this.appendChunk(chunk);
        }
      });
      this.sourceBuffer.mode = "sequence";
      this.media.duration = 1385;
      const chunk = this.chunks.shift();
      if (chunk) {
        this.appendChunk(chunk);
      }
    });
    this.grpcClient = grpc.invoke(VideoService.GetVideoStream, {
      request: videoRequest,
      host: `http://localhost:50051`,
      onMessage: (message: VideoResponse) => {
        if (message.getData_asU8().length > 0) {
          if (this.sourceBuffer && !this.sourceBuffer.updating && this.chunks.length === 0) {
            this.appendChunk(message.getData_asU8());
          } else {
            this.chunks.push(message.getData_asU8());
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

  setCurrentTime(event: Event) {
    const currentTime = (event.target as HTMLMediaElement).currentTime;
    if (currentTime - 20 > 0 && currentTime - 20 > this.lastClear && this.quotaExceeded) {
      this.sourceBuffer?.remove(this.lastClear, currentTime - 20);
      this.lastClear = currentTime - 20
      this.quotaExceeded = false;
    }
  }

  private appendChunk(chunk: Uint8Array): void {
    try {
      this.sourceBuffer?.appendBuffer(chunk);
    } catch (e) {
      if ((e as Error).name !== 'QuotaExceededError') {
        throw e;
      }
      this.chunks = [chunk, ...this.chunks];
      this.quotaExceeded = true;
    }
  }
}
