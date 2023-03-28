import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginRegisterComponent } from './auth-login-register/auth-login-register.component';
import { AuthMyAccountComponent } from './auth-my-account/auth-my-account.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpaceModule } from 'ng-zorro-antd/space';

@NgModule({
  declarations: [
    AuthLoginRegisterComponent,
    AuthMyAccountComponent,
    AuthLogoutComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NzButtonModule,
    NzDividerModule,
    NzFormModule,
    NzSpaceModule,
  ],
})
export class AuthModule {}
