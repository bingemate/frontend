import { Component, OnInit } from '@angular/core';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserResponse } from '../../../shared/models/user.models';

@Component({
  selector: 'app-statistics-watch-stats',
  templateUrl: './statistics-watch-stats.component.html',
  styleUrls: ['./statistics-watch-stats.component.less'],
})
export class StatisticsWatchStatsComponent implements OnInit {
  @Select(AuthState.user)
  user$!: Observable<UserResponse | null>;
  userID = '';

  ngOnInit(): void {
    this.user$.subscribe(user => {
      if (user) {
        this.userID = user.id;
      }
    });
  }
}
