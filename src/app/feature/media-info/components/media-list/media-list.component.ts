import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import {
  MediaType,
  MovieResponse,
  TvShowResponse,
} from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../media-info.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-media-list',
  templateUrl: './media-list.component.html',
  styleUrls: ['./media-list.component.less'],
})
export class MediaListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() mediaIds: {
    id: number;
    type: 'tv' | 'movie';
  }[] = [];

  medias: {
    type?: MediaType;
    movieResponse?: MovieResponse;
    tvShowResponse?: TvShowResponse;
  }[] = [];

  subscriptions: Subscription[] = [];

  isOnPhone = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly mediaService: MediaInfoService
  ) {}

  ngOnInit() {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
    this.medias = new Array(this.mediaIds.length).fill({});
    this.mediaIds.forEach(({ id, type }, index) => {
      this.getMedia(id, type, index);
    });
  }

  ngOnChanges() {
    this.medias = new Array(this.mediaIds.length).fill({});
    this.mediaIds.forEach((mediaId, index) => {
      this.getMedia(mediaId.id, mediaId.type, index);
    });
  }

  getMedia(mediaId: number, type: 'movie' | 'tv', index: number) {
    if (type === 'tv') {
      this.subscriptions.push(
        this.mediaService.getTvShowShortInfo(mediaId).subscribe({
          next: tvShow => {
            this.medias[index] = {
              type: MediaType.TvShow,
              tvShowResponse: tvShow,
            };
          },
        })
      );
    } else {
      this.subscriptions.push(
        this.mediaService.getMovieShortInfo(mediaId).subscribe({
          next: movie => {
            this.medias[index] = {
              type: MediaType.Movie,
              movieResponse: movie,
            };
          },
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected readonly MediaType = MediaType;
}
