import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../../../feature/calendar/calendar.service';
import { MediaType, TvShowResponse } from '../../../shared/models/media.models';
import {
  movieViewPath,
  tvShowViewPath,
} from '../../medias/medias-routing.module';
import { MediaEvent } from '../../../shared/models/event.models';
import { NotificationsService } from '../../../core/notifications/notifications.service';

@Component({
  selector: 'app-watchtlist-calendar',
  templateUrl: './watchtlist-calendar.component.html',
  styleUrls: ['./watchtlist-calendar.component.less'],
})
export class WatchtlistCalendarComponent implements OnInit {
  events: MediaEvent[] = [];
  tvShows: Map<number, string> = new Map<number, string>();
  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  showTvShows = true;
  showMovies = true;
  tvShowsLoading = false;
  moviesLoading = false;

  constructor(
    private calendarService: CalendarService,
    private readonly notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.refresh(new Date().getMonth() + 1, new Date().getFullYear());
  }

  refresh(month: number, year: number): void {
    this.tvShows.clear();
    this.events = [];
    this.refreshMovies(month, year);
    this.refreshTvShows(month, year);
  }

  private refreshTvShows(month: number, year: number) {
    if (this.showTvShows) {
      this.tvShowsLoading = true;
      this.calendarService.getFollowedShowsReleases(month, year).subscribe({
        next: events => {
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
        },
        error: () =>
          this.notificationsService.error(
            'Erreur lors du chargement des séries'
          ),
        complete: () => (this.tvShowsLoading = false),
      });
    }
  }

  private refreshMovies(month: number, year: number) {
    if (this.showMovies) {
      this.moviesLoading = true;
      this.calendarService.getFollowedMoviesReleases(month, year).subscribe({
        next: events => {
          this.events.push(
            ...events.map(event => ({
              title: event.title,
              date: new Date(event.releaseDate),
              type: MediaType.Movie,
              id: event.id,
            }))
          );
        },
        error: () =>
          this.notificationsService.error(
            'Erreur lors du chargement des films'
          ),
        complete: () => (this.moviesLoading = false),
      });
    }
  }

  onMovieCheckChange(): void {
    this.events = this.events.filter(event => event.type !== MediaType.Movie);
    this.refreshMovies(this.currentMonth, this.currentYear);
  }

  onTvShowCheckChange(): void {
    this.events = this.events.filter(event => event.type !== MediaType.Episode);
    this.refreshTvShows(this.currentMonth, this.currentYear);
  }

  onDateChange(month: number, year: number): void {
    if (month === this.currentMonth && year === this.currentYear) {
      return;
    }
    this.currentMonth = month;
    this.currentYear = year;
    this.refresh(month, year);
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
