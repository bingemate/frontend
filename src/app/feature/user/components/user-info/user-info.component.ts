import { Component, Input } from '@angular/core';
import {
  UpdateUserRequest,
  UserResponse,
} from '../../../../shared/models/user.models';
import { UserService } from '../../user.service';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from '../../../../core/notifications/notifications.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less'],
})
export class UserInfoComponent {
  @Select(AuthState.user) user$!: Observable<UserResponse>;
  authUser: UserResponse | null = null;

  @Select(AuthState.isAdmin) isAdmin$!: Observable<boolean>;
  isAdmin = false;
  roles: string[] = [];

  @Input() user: UserResponse | null = null;

  userForm: FormGroup | null = null;
  editMode = false;

  constructor(
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly notificationsService: NotificationsService
  ) {
    this.user$.subscribe(user => {
      this.authUser = user;
    });
    this.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
      if (this.isAdmin) {
        this.userService.getRoles().subscribe(roles => {
          this.roles = roles
            .filter(role => role.startsWith('bingemate'))
            .sort();
        });
      }
    });
  }

  canEdit(): boolean {
    return this.user?.id === this.authUser?.id || this.isAdmin;
  }

  canUpdateRoles(): boolean {
    return this.isAdmin;
  }

  updateUser(): void {
    const updateUser: UpdateUserRequest = {
      email: this.userForm?.value.email,
      username: this.userForm?.value.username,
      firstname: this.userForm?.value.firstname,
      lastname: this.userForm?.value.lastname,
    };
    if (this.isAdmin) {
      this.userService
        .updateUser(this.user?.id ?? '', updateUser)
        .subscribe(() => {
          this.updateUserSuccess(updateUser);
        });
    } else {
      this.userService.update(updateUser).subscribe(() => {
        this.updateUserSuccess(updateUser);
      });
    }
  }

  updateUserSuccess(updatedUser: UpdateUserRequest): void {
    this.notificationsService.success('Utilisateur mis à jour');
    this.toggleEditMode();
    this.user = {
      ...this.user!,
      email: updatedUser.email,
      username: updatedUser.username,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
    };
  }

  getBadgeColor(role: string): string {
    const index = role
      .split('')
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return badgeColors[index % badgeColors.length];
  }

  onRoleChange(role: string, checked: boolean): void {
    if (checked) {
      this.userService
        .addUserRole(this.user?.id ?? '', { role })
        .subscribe(() => {
          this.notificationsService.success('Rôle ajouté');
        });
    } else {
      this.userService
        .removeUserRole(this.user?.id ?? '', { role })
        .subscribe(() => {
          this.notificationsService.success('Rôle retiré');
        });
    }
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;
    if (this.editMode) {
      this.userForm = this.fb.group({
        username: [
          this.user?.username,
          [Validators.required, Validators.minLength(3)],
        ],
        email: [this.user?.email, [Validators.required, Validators.email]],
        firstname: [
          this.user?.firstname,
          [Validators.required, Validators.minLength(2)],
        ],
        lastname: [
          this.user?.lastname,
          [Validators.required, Validators.minLength(2)],
        ],
      });
    }
  }
}

const badgeColors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];
