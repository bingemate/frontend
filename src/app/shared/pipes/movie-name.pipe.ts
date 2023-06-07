import { Pipe, PipeTransform } from '@angular/core';
import { MediaInfoService } from '../../feature/media-info/media-info.service';
import { map, Observable, of } from 'rxjs';

@Pipe({
  name: 'movieName',
})
export class MovieNamePipe implements PipeTransform {
  private readonly movieNames = new Map<number, string>();
  constructor(private readonly mediaService: MediaInfoService) {}

  transform(mediaId: number): Observable<string> {
    const movieTitle = this.movieNames.get(mediaId);
    if (movieTitle) {
      return of(movieTitle);
    }
    return this.mediaService.getMovieShortInfo(mediaId).pipe(
      map(movieInfo => {
        this.movieNames.set(mediaId, movieInfo.title);
        return movieInfo.title;
      })
    );
  }
}
