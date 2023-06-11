import { Component, Input, OnInit } from '@angular/core';
import {
  MovieResponse,
  TvEpisodeResponse,
} from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../media-info.service';

@Component({
  selector: 'app-media-info',
  templateUrl: './media-info.component.html',
  styleUrls: ['./media-info.component.less'],
})
export class MediaInfoComponent implements OnInit {
  readonly emptyImage = '';
  @Input() mediaId = 0;
  @Input()
  type: 'movies' | 'tv-shows' = 'movies';

  @Input()
  vertical = false;

  movieMedia: MovieResponse | undefined;
  episodeMedia: TvEpisodeResponse | undefined;
  posterUrl = this.emptyImage;

  constructor(private mediaInfoService: MediaInfoService) {}

  ngOnInit(): void {
    if (this.type === 'tv-shows') {
      this.mediaInfoService
        .getTvShowEpisodeInfoById(this.mediaId)
        .subscribe(episode => {
          this.episodeMedia = episode;
          this.posterUrl = episode.posterUrl;
        });
    } else {
      this.mediaInfoService.getMovieInfo(this.mediaId).subscribe(movie => {
        this.movieMedia = movie;
        this.posterUrl = movie.backdropUrl;
      });
    }
  }
}
