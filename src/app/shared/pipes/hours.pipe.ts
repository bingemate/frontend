import { Pipe, PipeTransform } from '@angular/core';
import { MediaInfoService } from '../../feature/media-info/media-info.service';

@Pipe({
  name: 'hours',
})
export class HoursPipe implements PipeTransform {
  constructor(private readonly mediaService: MediaInfoService) {}

  transform(time: number): string {
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time % 60);
    return hours + 'h' + minutes;
  }
}
