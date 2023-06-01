import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserService } from '../../feature/user/user.service';

@Pipe({
  name: 'username',
})
export class UsernamePipe implements PipeTransform {
  constructor(private readonly userService: UserService) {}

  transform(userID: string): Observable<string> {
    return this.userService
      .getUsername(userID)
      .pipe(map(username => username.username));
  }
}
