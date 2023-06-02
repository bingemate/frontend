import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../feature/calendar/calendar.service';
import { MediaType, TvShowResponse } from '../../../shared/models/media.models';
import { movieViewPath, tvShowViewPath } from '../../medias/medias-routing.module';
import { MediaEvent } from '../../../shared/models/event.models';

@Component({
  selector: 'app-watchtlist-calendar',
  templateUrl: './watchtlist-calendar.component.html',
  styleUrls: ['./watchtlist-calendar.component.less'],
})
export class WatchtlistCalendarComponent implements OnInit {
  events: MediaEvent[] = [];
  tvShows: Map<number, string> = new Map<number, string>();
  currentMonth = new Date().getMonth() + 1;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.refresh(new Date().getMonth() + 1);
  }

  refresh(month: number): void {
    this.tvShows.clear();
    this.events = [];
    this.calendarService.getFollowedMoviesReleases(month).subscribe(events => {
      this.events.push(
        ...events.map(event => ({
          title: event.title,
          date: new Date(event.releaseDate),
          type: MediaType.Movie,
          id: event.id,
        }))
      );
    });
    this.calendarService.getFollowedShowsReleases(month).subscribe(events => {
      events.tvShows.forEach((tvShow: TvShowResponse) => {
        this.tvShows.set(tvShow.id, tvShow.title);
      });
      this.events.push(
        ...events.episodes.map(event => ({
          title: this.tvShows.get(event.tvShowId) ?? '',
          episode: `${event.seasonNumber}x${event.episodeNumber
            .toString()
            .padStart(2, '0')} - ${event.name}`,
          date: new Date(event.airDate),
          type: MediaType.Episode,
          id: event.tvShowId,
        }))
      );
    });
  }

  onMonthChange(month: number): void {
    if (month === this.currentMonth) {
      return;
    }
    this.currentMonth = month;
    this.refresh(month);
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
