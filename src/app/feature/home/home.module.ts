import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { NoauthHomeComponent } from './components/noauth-home/noauth-home.component';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { RouterLink } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { LottieComponent } from 'ngx-lottie';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzListModule } from 'ng-zorro-antd/list';
import { MediaInfoModule } from '../media-info/media-info.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NzProgressModule } from 'ng-zorro-antd/progress';

@NgModule({
  declarations: [NoauthHomeComponent, AuthHomeComponent],
  exports: [NoauthHomeComponent, AuthHomeComponent],
  imports: [
    CommonModule,
    NzLayoutModule,
    NzCarouselModule,
    NzDividerModule,
    NzGridModule,
    NzButtonModule,
    NzImageModule,
    NgOptimizedImage,
    NzSpaceModule,
    NzTypographyModule,
    RouterLink,
    NzCardModule,
    LottieComponent,
    NzCommentModule,
    NzPageHeaderModule,
    NzListModule,
    MediaInfoModule,
    ScrollingModule,
    NzProgressModule,
  ],
})
export class HomeModule {}
