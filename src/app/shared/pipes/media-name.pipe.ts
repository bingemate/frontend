import { Pipe, PipeTransform } from '@angular/core';
import { MediaInfoService } from '../../feature/media-info/media-info.service';
import { catchError, map, Observable, of } from 'rxjs';

@Pipe({
  name: 'mediaName',
})
export class MediaNamePipe implements PipeTransform {
  private readonly mediaNames = new Map<number, string>();
  constructor(private readonly mediaService: MediaInfoService) {}

  transform(mediaId: number): Observable<string> {
    const mediaTitle = this.mediaNames.get(mediaId);
    if (mediaTitle) {
      return of(mediaTitle);
    }
    return this.mediaService.getTvShowShortInfo(mediaId).pipe(
      map(movieInfo => {
        this.mediaNames.set(mediaId, movieInfo.title);
        return movieInfo.title;
      }),
      catchError(() => {
        return this.mediaService.getMovieShortInfo(mediaId).pipe(
          map(tvShowInfo => {
            this.mediaNames.set(mediaId, tvShowInfo.title);
            return tvShowInfo.title;
          })
        );
      })
    );
  }
}
