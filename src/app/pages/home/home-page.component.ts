import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { AuthState } from '../../core/auth/store/auth.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  @Select(AuthState.isAuthenticated)
  isAuthenticated$!: Observable<boolean>;
  isAuth = false;

  constructor() {
    this.isAuthenticated$.subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }
}
