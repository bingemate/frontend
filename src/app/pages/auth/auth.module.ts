import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginRegisterComponent } from './auth-login-register/auth-login-register.component';
import { AuthMyAccountComponent } from './auth-my-account/auth-my-account.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';

@NgModule({
  declarations: [
    AuthLoginRegisterComponent,
    AuthMyAccountComponent,
    AuthLogoutComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, NzButtonModule],
})
export class AuthModule {}
