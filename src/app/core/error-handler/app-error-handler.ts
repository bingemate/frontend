import { ErrorHandler, Injectable } from '@angular/core';
import { NotificationsService } from '../notifications/notifications.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor(private readonly notificationsService: NotificationsService) {
    super();
  }

  override handleError(error: Error | HttpErrorResponse) {
    console.error('An error occurred.');
    console.error(error);
    console.error(error.message);
    if (!environment.production) {
      this.notificationsService.error('An error occurred.', error.message);
    } else {
      this.notificationsService.error('An error occurred.');
    }
    super.handleError(error);
  }
}
