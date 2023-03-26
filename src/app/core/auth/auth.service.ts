import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../shared/models/user.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  login(payload: any): Observable<string> {
    return new Observable<string>(observer => {
      observer.next('token');
      observer.complete();
    });
  }

  logout(): Observable<void> {
    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  getMe(): Observable<UserModel> {
    return new Observable<UserModel>(observer => {
      observer.next({
        id: 'axzfzohgzhg-efzohfzegze-zefzeg',
        username: 'John Doe',
        firstname: 'John',
        lastname: 'Doe',
        email: 'example@mail.com',
        roles: ['admin'],
      });
      observer.complete();
    });
  }
}
