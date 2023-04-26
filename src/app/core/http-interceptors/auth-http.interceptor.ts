import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/** Passes user id in headers in local */
@Injectable()
export class LocalHttpAuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authReq = request.clone({
      headers: request.headers.set('user-id', 'id'),
    });

    return next.handle(authReq);
  }
}
