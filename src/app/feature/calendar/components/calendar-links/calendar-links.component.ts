import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { Observable, Subscription } from 'rxjs';
import { UserResponse } from '../../../../shared/models/user.models';
import { API_RESOURCE_URI } from '../../../../shared/api-resource-uri/api-resources-uri';

@Component({
  selector: 'app-calendar-links',
  templateUrl: './calendar-links.component.html',
  styleUrls: ['./calendar-links.component.less'],
})
export class CalendarLinksComponent implements OnInit, OnDestroy {
  @Select(AuthState.user) user$!: Observable<UserResponse>;
  user: UserResponse | null = null;

  calendarLinks = {
    tvShows: API_RESOURCE_URI.MEDIA_INFO + '/calendar/tvshows/ical/',
    movies: API_RESOURCE_URI.MEDIA_INFO + '/calendar/movies/ical/',
  };

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(this.user$.subscribe(user => (this.user = user)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
