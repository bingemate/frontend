import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { UserService } from '../../feature/user/user.service';

@Pipe({
  name: 'username',
})
export class UsernamePipe implements PipeTransform {
  private readonly usernames = new Map<string, string>();
  constructor(private readonly userService: UserService) {}

  transform(userID: string): Observable<string> {
    const username = this.usernames.get(userID);
    if (username) {
      return of(username);
    }
    return this.userService.getUsername(userID).pipe(
      map(username => {
        this.usernames.set(userID, username.username);
        return username.username;
      })
    );
  }
}
