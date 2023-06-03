import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MediaEvent } from '../../../../shared/models/event.models';
import { MediaType } from '../../../../shared/models/media.models';
import {
  movieViewPath,
  tvShowViewPath,
} from '../../../../pages/medias/medias-routing.module';

@Component({
  selector: 'app-media-calendar',
  templateUrl: './media-calendar.component.html',
  styleUrls: ['./media-calendar.component.less'],
})
export class MediaCalendarComponent {
  @Input() events: MediaEvent[] = [];
  @Output() monthChange = new EventEmitter<number>();

  onDateChange(date: Date): void {
    this.monthChange.emit(date.getMonth() + 1);
  }

  getEventTitle(event: MediaEvent): string {
    return event.episode ? `${event.title} - ${event.episode}` : event.title;
  }

  getRouterLink(event: MediaEvent): string[] {
    return event.type === MediaType.Movie
      ? [movieViewPath, event.id.toString()]
      : [tvShowViewPath, event.id.toString()];
  }

  getEventColor(event: MediaEvent): string {
    return badgeColors[
      event.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        badgeColors.length
    ];
  }

  getEventsFromDate(date: Date): MediaEvent[] {
    return this.events.filter(
      event => event.date.toDateString() === date.toDateString()
    );
  }
}

const badgeColors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];
