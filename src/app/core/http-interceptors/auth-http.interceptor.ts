import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { AuthState } from "../auth/store/auth.state";

/** Passes user id in headers in local */
@Injectable()
export class LocalHttpAuthInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const userId = this.store.selectSnapshot(AuthState.user)?.id;
    let headers = request.headers;
    if (userId) {
      headers = headers.set('user-id', userId);
    }
    const authReq = request.clone({ headers });
    return next.handle(authReq);
  }
}
