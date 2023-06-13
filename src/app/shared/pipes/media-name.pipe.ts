import { Pipe, PipeTransform } from '@angular/core';
import { MediaInfoService } from '../../feature/media-info/media-info.service';
import { map, Observable, switchMap } from 'rxjs';

@Pipe({
  name: 'mediaName',
})
export class MediaNamePipe implements PipeTransform {
  constructor(private readonly mediaService: MediaInfoService) {}

  transform(
    mediaId: number,
    type: 'movie' | 'tv' | 'episode'
  ): Observable<string> {
    if (type === 'movie') {
      return this.mediaService
        .getMovieShortInfo(mediaId)
        .pipe(map(movieInfo => movieInfo.title));
    }
    if (type === 'episode') {
      return this.mediaService.getTvShowEpisodeInfoById(mediaId).pipe(
        switchMap(episodeInfo =>
          this.mediaService.getTvShowShortInfo(episodeInfo.tvShowId).pipe(
            map(tvShowInfo => {
              return `${tvShowInfo.title} - ${
                episodeInfo.seasonNumber
              }x${episodeInfo.episodeNumber.toString().padStart(2, '0')} - ${
                episodeInfo.name
              }`;
            })
          )
        )
      );
    }

    return this.mediaService
      .getTvShowShortInfo(mediaId)
      .pipe(map(movieInfo => movieInfo.title));
  }
}
