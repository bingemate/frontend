import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../../core/auth/store/auth.actions';

@Component({
  selector: 'app-auth-logout',
  templateUrl: './auth-logout.component.html',
  styleUrls: ['./auth-logout.component.less'],
})
export class AuthLogoutComponent implements OnInit {
  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.Logout());
  }
}
