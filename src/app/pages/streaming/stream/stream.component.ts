import { Component, OnInit } from '@angular/core';
import { MediaFile } from '../../../shared/models/media-file.models';
import { ActivatedRoute } from '@angular/router';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { forkJoin, switchMap } from 'rxjs';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.less'],
})
export class StreamComponent implements OnInit {
  mediaId = 123456;
  mediaFile: MediaFile | undefined;
  error: string | undefined;
  mediaTitle = 'undefined';
  progress = 0;

  constructor(
    private route: ActivatedRoute,
    private mediaInfoService: MediaInfoService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(params => {
          this.mediaId = parseInt(params['id']);
          return forkJoin([
            this.mediaInfoService.getFileInfos(this.mediaId),
            this.mediaInfoService.getMediaInfo(this.mediaId),
          ]);
        })
      )
      .subscribe({
        next: ([mediaFile, mediaInfo]) => {
          this.mediaFile = mediaFile;
          if (this.route.snapshot.queryParamMap.has('progress')) {
            this.progress =
              mediaFile.duration *
              Number.parseFloat(
                this.route.snapshot.queryParamMap.get('progress') || '0'
              );
          }
          this.mediaTitle = mediaInfo.name;
        },
        error: err => {
          console.error(err.error.error);
          this.error = err.error.error;
        },
      });
  }
}
