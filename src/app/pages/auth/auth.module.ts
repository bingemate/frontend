import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginRegisterComponent } from './auth-login-register/auth-login-register.component';
import { AuthMyAccountComponent } from './auth-my-account/auth-my-account.component';

@NgModule({
  declarations: [AuthLoginRegisterComponent, AuthMyAccountComponent],
  imports: [CommonModule, AuthRoutingModule],
})
export class AuthModule {}
