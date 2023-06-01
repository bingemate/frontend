import { Component, Input, OnChanges, OnInit } from '@angular/core';
import {
  MediaType,
  MovieResponse,
  TvShowResponse,
} from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../media-info.service';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.less'],
})
export class MediaListComponent implements OnInit, OnChanges {
  @Input() mediaIds: number[] = [];

  medias: {
    type?: MediaType;
    movieResponse?: MovieResponse;
    tvShowResponse?: TvShowResponse;
  }[] = [];

  constructor(private readonly mediaService: MediaInfoService) {}

  ngOnInit() {
    this.medias = new Array(this.mediaIds.length).fill({});
    this.mediaIds.forEach((mediaId, index) => {
      this.getMedia(mediaId, index);
    });
  }

  ngOnChanges() {
    this.medias = new Array(this.mediaIds.length).fill({});
    this.mediaIds.forEach((mediaId, index) => {
      this.getMedia(mediaId, index);
    });
  }

  getMedia(mediaId: number, index: number) {
    this.mediaService.getTvShowShortInfo(mediaId).subscribe({
      next: tvShow => {
        this.medias[index] = {
          type: MediaType.TvShow,
          tvShowResponse: tvShow,
        };
      },
      error: () => {
        this.mediaService.getMovieShortInfo(mediaId).subscribe({
          next: movie => {
            this.medias[index] = {
              type: MediaType.Movie,
              movieResponse: movie,
            };
          },
        });
      },
    });
  }

  protected readonly MediaType = MediaType;
}
