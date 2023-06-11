import { Pipe, PipeTransform } from '@angular/core';
import { MediaInfoService } from '../../feature/media-info/media-info.service';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'mediaName',
})
export class MediaNamePipe implements PipeTransform {
  constructor(private readonly mediaService: MediaInfoService) {}

  transform(mediaId: number, type: 'movie' | 'tv'): Observable<string> {
    if (type === 'movie') {
      return this.mediaService
        .getMovieShortInfo(mediaId)
        .pipe(map(movieInfo => movieInfo.title));
    }

    return this.mediaService
      .getTvShowShortInfo(mediaId)
      .pipe(map(movieInfo => movieInfo.title));
  }
}
