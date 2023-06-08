import { Pipe, PipeTransform } from '@angular/core';
import { MediaInfoService } from '../../feature/media-info/media-info.service';
import { map, Observable } from 'rxjs';

@Pipe({
  name: 'movieName',
})
export class MovieNamePipe implements PipeTransform {
  constructor(private readonly mediaService: MediaInfoService) {}

  transform(mediaId: number): Observable<string> {
    return this.mediaService
      .getMovieShortInfo(mediaId)
      .pipe(map(movieInfo => movieInfo.title));
  }
}
