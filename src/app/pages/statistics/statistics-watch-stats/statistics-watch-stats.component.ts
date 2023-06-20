import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthState } from '../../../core/auth/store/auth.state';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { UserResponse } from '../../../shared/models/user.models';

@Component({
  selector: 'app-statistics-watch-stats',
  templateUrl: './statistics-watch-stats.component.html',
  styleUrls: ['./statistics-watch-stats.component.less'],
})
export class StatisticsWatchStatsComponent implements OnInit, OnDestroy {
  @Select(AuthState.user)
  user$!: Observable<UserResponse | null>;
  userID = '';

  subscriptions: Subscription[] = [];

  ngOnInit(): void {
    this.subscriptions.push(
      this.user$.subscribe(user => {
        if (user) {
          this.userID = user.id;
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
