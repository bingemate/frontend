import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private readonly nzNotificationService: NzNotificationService) {}

  default(title: string, message = '', duration = 2000) {
    this.nzNotificationService.blank(title, message, {
      nzDuration: duration,
    });
  }

  info(title: string, message = '', duration = 2000) {
    this.nzNotificationService.info(title, message, {
      nzDuration: duration,
    });
  }

  success(title: string, message = '', duration = 2000) {
    this.nzNotificationService.success(title, message, {
      nzDuration: duration,
    });
  }

  warn(title: string, message = '', duration = 2000) {
    this.nzNotificationService.warning(title, message, {
      nzDuration: duration,
    });
  }

  error(title: string, message = '', duration = 2000) {
    this.nzNotificationService.error(title, message, {
      nzDuration: duration,
    });
  }
}
