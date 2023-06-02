import { Component, Input } from '@angular/core';
import { UserResponse } from '../../../../shared/models/user.models';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less'],
})
export class UserInfoComponent {
  @Input() user: UserResponse | null = null;
}
