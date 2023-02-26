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
  videoUrl?: SafeUrl;
  grpcClient?: Request;
  chunks: Uint8Array[] = [];
  metadata?: Uint8Array;
  sourceBuffer?: SourceBuffer;
  media = new MediaSource();

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    const videoRequest = new VideoRequest();
    videoRequest.setVideoId(1);
    this.videoUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(this.media));
    this.media.addEventListener("sourceopen", () => {
      this.media.setLiveSeekableRange(0, 260)
      if (this.metadata) {
        this.sourceBuffer = this.media.addSourceBuffer('video/mp4; codecs="mp4a.40.2, hev1.1.6.L120.90"');
        this.sourceBuffer.mode = "segments";
        this.sourceBuffer.appendBuffer(this.metadata);
        this.chunks.forEach(chunk => this.sourceBuffer?.appendBuffer(chunk));
      }
    });
    this.grpcClient = grpc.invoke(VideoService.GetVideoStream, {
      request: videoRequest,
      host: `http://localhost:50051`,
      onMessage: (message: VideoResponse) => {
        if (message.getMetadata_asU8().length > 0) {
          if (this.sourceBuffer) {
            this.sourceBuffer.appendBuffer(message.getMetadata_asU8());
          } else {
            this.metadata = message.getMetadata_asU8();
          }
        }
        if (message.getData_asU8().length > 0) {
          if (this.sourceBuffer) {
            this.sourceBuffer.appendBuffer(message.getData_asU8());
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
}
