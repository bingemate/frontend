import { Pipe, PipeTransform } from '@angular/core';
import { MediaInfoService } from '../../feature/media-info/media-info.service';
import { catchError, map, Observable } from 'rxjs';

@Pipe({
  name: 'mediaName',
})
export class MediaNamePipe implements PipeTransform {
  constructor(private readonly mediaService: MediaInfoService) {}

  transform(mediaId: number): Observable<string> {
    return this.mediaService.getTvShowShortInfo(mediaId).pipe(
      map(movieInfo => movieInfo.title),
      catchError(() => {
        return this.mediaService
          .getMovieShortInfo(mediaId)
          .pipe(map(tvShowInfo => tvShowInfo.title));
      })
    );
  }
}
