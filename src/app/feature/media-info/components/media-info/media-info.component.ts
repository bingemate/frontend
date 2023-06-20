import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  MovieResponse,
  TvEpisodeResponse,
} from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../media-info.service';
import { Subscription } from 'rxjs';

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

  movieMedia: MovieResponse | undefined;
  episodeMedia: TvEpisodeResponse | undefined;
  posterUrl = this.emptyImage;

  subscriptions: Subscription[] = [];

  constructor(private mediaInfoService: MediaInfoService) {}

  ngOnInit(): void {
    if (this.type === 'tv-shows') {
      this.subscriptions.push(
        this.mediaInfoService
          .getTvShowEpisodeInfoById(this.mediaId)
          .subscribe(episode => {
            this.episodeMedia = episode;
            this.posterUrl = episode.posterUrl;
          })
      );
    } else {
      this.subscriptions.push(
        this.mediaInfoService
          .getMovieShortInfo(this.mediaId)
          .subscribe(movie => {
            this.movieMedia = movie;
            this.posterUrl = movie.backdropUrl;
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
