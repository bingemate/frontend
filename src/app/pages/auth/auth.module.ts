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
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { CommentModule } from '../../feature/comment/comment.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { RatingModule } from '../../feature/rating/rating.module';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';

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
    NzTabsModule,
    NzIconModule,
    NzPaginationModule,
    CommentModule,
    NzCardModule,
    RatingModule,
    NzDescriptionsModule,
    NzTagModule,
  ],
})
export class AuthModule {}
