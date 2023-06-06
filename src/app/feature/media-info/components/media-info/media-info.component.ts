import { Component, Input, OnInit } from '@angular/core';
import {
  MediaResponse,
  MediaType,
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
  vertical = false;

  media: MediaResponse | undefined;
  posterUrl = this.emptyImage;

  constructor(private mediaInfoService: MediaInfoService) {}

  ngOnInit(): void {
    this.mediaInfoService.getMediaInfo(this.mediaId).subscribe({
      next: (media: MediaResponse) => {
        this.media = media;
        if (media.mediaType === MediaType.Episode) {
          this.mediaInfoService
            .getTvShowEpisodeInfoById(media.id)
            .subscribe(episode => {
              this.posterUrl = episode.posterUrl;
            });
        } else if (media.mediaType === MediaType.Movie) {
          this.mediaInfoService.getMovieInfo(media.id).subscribe(movie => {
            this.posterUrl = movie.backdropUrl;
          });
        }
      },
    });
  }
}
