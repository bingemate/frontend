import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../../core/auth/store/auth.state';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  @Select(AuthState.isAuthenticated)
  isAuthenticated$!: Observable<boolean>;
  isAuth = false;

  subscriptions: Subscription[] = [];

  constructor() {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.isAuthenticated$.subscribe(isAuth => {
        this.isAuth = isAuth;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
