import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsProviderModule } from './icons/icons-provider.module';
import { AppErrorHandler } from './error-handler/app-error-handler';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './http-interceptors/http-error.interceptor';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },
  ],
  imports: [CommonModule, IconsProviderModule, NzNotificationModule],
  exports: [IconsProviderModule],
})
export class CoreModule {}
