import { Component, Input } from '@angular/core';
import { UserResponse } from '../../../../shared/models/user.models';
import { userProfilViewLinks } from '../../../../pages/social-network/social-network-routing.module';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
})
export class UserListComponent {
  @Input() users: UserResponse[] = [];
  protected readonly userProfilViewLinks = userProfilViewLinks;
}
