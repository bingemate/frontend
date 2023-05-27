import { ErrorHandler, Injectable, Injector } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NotificationsService } from '../notifications/notifications.service';

/** Passes HttpErrorResponse to application-wide error handler */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private notificationsService: NotificationsService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: (err: unknown) => {
          if (err instanceof HttpErrorResponse && err.status !== 404) {
            const appErrorHandler = this.injector.get(ErrorHandler);
            appErrorHandler.handleError(err);
            if (err.error.error) {
              this.notificationsService.error(
                'An error occurred',
                err.error.error
              );
            } else {
              this.notificationsService.error('An error occurred', err.message);
            }
          }
        },
      })
    );
  }
}
