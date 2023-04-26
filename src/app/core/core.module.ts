import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from './icons/icons-provider.module';
import { AppErrorHandler } from './error-handler/app-error-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ThemeService } from './theme/theme.service';
import { FeaturesModule } from '../feature/features.module';
import { environment } from '../../environments/environment';
import { LocalHttpAuthInterceptor } from "./http-interceptors/auth-http.interceptor";

@NgModule({
  declarations: [],
  providers: [
    ...[
      environment.envName === 'LOCAL'
        ? {
            provide: HTTP_INTERCEPTORS,
            useClass: LocalHttpAuthInterceptor,
            multi: true,
          }
        : [],
    ],
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
    ThemeService,
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    IconsProviderModule,
    NzNotificationModule,
  ],
  exports: [IconsProviderModule],
})
export class CoreModule {}
