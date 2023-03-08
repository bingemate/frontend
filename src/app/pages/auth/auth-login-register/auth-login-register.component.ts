import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthActions } from '../../../core/auth/store/auth.actions';

@Component({
  selector: 'app-auth-login-register',
  templateUrl: './auth-login-register.component.html',
  styleUrls: ['./auth-login-register.component.less'],
})
export class AuthLoginRegisterComponent {
  loginMode = true;

  constructor(router: Router, private readonly store: Store) {
    this.loginMode = router.url.includes('login');
  }

  login() {
    this.store.dispatch(
      new AuthActions.Login({ email: 'jon@example.com', password: '123456' })
    );
  }
}
