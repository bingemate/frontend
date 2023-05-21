import { Component, OnInit } from '@angular/core';
import { MediaFile } from '../../../shared/models/media-file.models';
import { ActivatedRoute } from '@angular/router';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { MediaResponse } from '../../../shared/models/media.models';

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

  constructor(
    private route: ActivatedRoute,
    private mediaInfoService: MediaInfoService
  ) {}

  ngOnInit(): void {
    this.mediaId = Number.parseInt(
      this.route.snapshot.paramMap.get('id') || ''
    );
    if (isNaN(this.mediaId)) {
      this.error = "L'id n'est pas valide";
      return;
    }
    this.mediaInfoService.getFileInfos(this.mediaId).subscribe({
      next: (mediaFile: MediaFile) => {
        this.mediaFile = mediaFile;
      },
      error: (err: any) => {
        console.error(err.error.error);
        this.error = err.error.error;
      },
    });
    this.mediaInfoService.getMediaInfo(this.mediaId).subscribe({
      next: (mediaInfo: MediaResponse) => {
        this.mediaTitle = mediaInfo.name;
      },
      error: (err: any) => {
        console.error(err.error.error);
        this.error = err.error.error;
      },
    });
  }
}
