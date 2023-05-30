import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../shared/models/user.models';
import { API_RESOURCE_URI } from '../../../../shared/api-resource-uri/api-resources-uri';

@Component({
  selector: 'app-calendar-links',
  templateUrl: './calendar-links.component.html',
  styleUrls: ['./calendar-links.component.less'],
})
export class CalendarLinksComponent {
  @Select(AuthState.user) user$!: Observable<UserModel>;
  user: UserModel | null = null;

  calendarLinks = {
    tvShows: API_RESOURCE_URI.MEDIA_INFO + '/calendar/tvshows/ical/',
    movies: API_RESOURCE_URI.MEDIA_INFO + '/calendar/movies/ical/',
  };

  constructor() {
    this.user$.subscribe(user => (this.user = user));
  }
}
