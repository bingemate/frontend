import { Pipe, PipeTransform } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { MediaInfoService } from '../../feature/media-info/media-info.service';
import { navigationRoot } from '../../app-routing.module';
import { mediasLinks } from '../../pages/medias/medias-routing.module';

@Pipe({
  name: 'mediaLink',
})
export class MediaLinkPipe implements PipeTransform {
  constructor(private readonly mediaService: MediaInfoService) {}

  transform(mediaId: number, type: 'movie' | 'tv'): Observable<string> {
    if (type === 'movie') {
      return this.mediaService
        .getMovieShortInfo(mediaId)
        .pipe(
          map(
            () =>
              `/${navigationRoot.medias.path}/${mediasLinks.movie_view.path}/${mediaId}`
          )
        );
    }
    return this.mediaService
      .getTvShowShortInfo(mediaId)
      .pipe(
        map(
          () =>
            `/${navigationRoot.medias.path}/${mediasLinks.tv_show_view.path}/${mediaId}`
        )
      );
  }
}
