import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-login-register',
  templateUrl: './auth-login-register.component.html',
  styleUrls: ['./auth-login-register.component.less'],
})
export class AuthLoginRegisterComponent {
  loginMode = true;

  constructor(router: Router) {
    this.loginMode = router.url.includes('login');
  }
}
