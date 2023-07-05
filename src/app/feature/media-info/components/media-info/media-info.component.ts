import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  MovieResponse,
  TvEpisodeResponse,
  TvShowResponse,
} from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../media-info.service';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-media-info',
  templateUrl: './media-info.component.html',
  styleUrls: ['./media-info.component.less'],
})
export class MediaInfoComponent implements OnInit, OnDestroy {
  readonly emptyImage = '';
  @Input() mediaId = 0;
  @Input()
  type: 'movies' | 'tv-shows' = 'movies';

  @Input()
  vertical = false;

  @Input()
  movieMedia: MovieResponse | undefined;
  @Input()
  episodeMedia: TvEpisodeResponse | undefined;
  @Input()
  tvShowMedia: TvShowResponse | undefined;

  posterUrl = this.emptyImage;

  subscriptions: Subscription[] = [];

  isOnPhone = false;

  constructor(
    private mediaInfoService: MediaInfoService,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
    if (this.type === 'tv-shows') {
      if (this.mediaId !== 0 && this.episodeMedia === undefined) {
        this.subscriptions.push(
          this.mediaInfoService
            .getTvShowEpisodeInfoById(this.mediaId)
            .subscribe(episode => {
              this.episodeMedia = episode;
              this.posterUrl = episode.posterUrl;
            })
        );
      } else {
        this.posterUrl = this.episodeMedia?.posterUrl ?? this.emptyImage;
      }
    } else {
      if (this.mediaId !== 0 && this.movieMedia === undefined) {
        this.subscriptions.push(
          this.mediaInfoService
            .getMovieShortInfo(this.mediaId)
            .subscribe(movie => {
              this.movieMedia = movie;
              this.posterUrl = movie.backdropUrl;
            })
        );
      } else {
        this.posterUrl = this.movieMedia?.backdropUrl ?? this.emptyImage;
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
