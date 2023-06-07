import { Pipe, PipeTransform } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { MediaInfoService } from '../../feature/media-info/media-info.service';
import { navigationRoot } from '../../app-routing.module';
import { mediasLinks } from '../../pages/medias/medias-routing.module';

@Pipe({
  name: 'mediaLink',
})
export class MediaLinkPipe implements PipeTransform {
  private readonly mediaLinks = new Map<number, string>();
  constructor(private readonly mediaService: MediaInfoService) {}

  transform(mediaId: number): Observable<string> {
    const mediaLink = this.mediaLinks.get(mediaId);
    if (mediaLink) {
      return of(mediaLink);
    }
    return this.mediaService.getTvShowShortInfo(mediaId).pipe(
      map(() => {
        const link = `/${navigationRoot.medias.path}/${mediasLinks.tv_show_view.path}/${mediaId}`;
        this.mediaLinks.set(mediaId, link);
        return link;
      }),
      catchError(() => {
        return this.mediaService.getMovieShortInfo(mediaId).pipe(
          map(() => {
            const link = `/${navigationRoot.medias.path}/${mediasLinks.movie_view.path}/${mediaId}`;
            this.mediaLinks.set(mediaId, link);
            return link;
          })
        );
      })
    );
  }
}
