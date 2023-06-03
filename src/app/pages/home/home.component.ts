import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../../core/auth/store/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @Select(AuthState.isAuthenticated)
  isAuthenticated$!: Observable<boolean>;
  isAuth = false;

  constructor() {
    this.isAuthenticated$.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }
}
