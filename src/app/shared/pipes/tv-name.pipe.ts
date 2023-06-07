import { Pipe, PipeTransform } from '@angular/core';
import { MediaInfoService } from '../../feature/media-info/media-info.service';
import { map, Observable, of } from 'rxjs';

@Pipe({
  name: 'tvName',
})
export class TvNamePipe implements PipeTransform {
  private readonly tvNames = new Map<number, string>();
  constructor(private readonly mediaService: MediaInfoService) {}

  transform(mediaId: number): Observable<string> {
    const tvTitle = this.tvNames.get(mediaId);
    if (tvTitle) {
      return of(tvTitle);
    }
    return this.mediaService.getTvShowShortInfo(mediaId).pipe(
      map(tvInfo => {
        this.tvNames.set(mediaId, tvInfo.title);
        return tvInfo.title;
      })
    );
  }
}
