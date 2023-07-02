import { Injectable, TemplateRef } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Actions } from '@ngxs/store';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private readonly nzNotificationService: NzNotificationService,
    private readonly actions$: Actions
  ) {}

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

  template(template: TemplateRef<object>, nzData?: any) {
    this.nzNotificationService.template(template, { nzData });
  }
}
