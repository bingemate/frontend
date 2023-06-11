import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hours',
})
export class HoursPipe implements PipeTransform {
  transform(hours: number): string {
    const minutes = Math.floor((hours % 1) * 60);
    hours = Math.floor(hours);
    return hours + 'h' + minutes;
  }
}
