import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  UpdateUserRequest,
  UserResponse,
} from '../../../../shared/models/user.models';
import { UserService } from '../../user.service';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { FriendshipService } from '../../../friendship/friendship.service';
import {
  FriendResponse,
  FriendState,
} from '../../../../shared/models/friendship.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  isOnPhone = false;

  @Select(AuthState.user) user$!: Observable<UserResponse>;
  authUser: UserResponse | null = null;

  @Select(AuthState.isAdmin) isAdmin$!: Observable<boolean>;
  isAdmin = false;
  roles: string[] = [];

  @Input() owner = false;

  @Input() user: UserResponse | null = null;

  userForm: FormGroup | null = null;
  editMode = false;
  sending = false;

  relationShip: FriendResponse | null = null;
  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly userService: UserService,
    private readonly fb: FormBuilder,
    private readonly notificationsService: NotificationsService,
    private friendShipService: FriendshipService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.subscriptions.push(
      this.user$.subscribe(user => {
        this.authUser = user;
      })
    );
    this.subscriptions.push(
      this.isAdmin$.subscribe(isAdmin => {
        this.isAdmin = isAdmin;
        if (this.isAdmin) {
          this.userService.getRoles().subscribe(roles => {
            this.roles = roles
              .filter(role => role.startsWith('bingemate'))
              .sort();
          });
        }
      })
    );
    setTimeout(() => {
      if (this.user?.id !== this.authUser?.id) {
        this.subscriptions.push(
          this.friendShipService
            .getRelationShip(this.user?.id ?? 'empty')
            .subscribe({
              next: relationShip => {
                this.relationShip = relationShip;
              },
            })
        );
      }
    }, 200);
  }

  mapStateToLabel(state: FriendState): string {
    switch (state) {
      case FriendState.REQUESTED:
        return 'Demande en attente';
      case FriendState.ACCEPTED:
        return 'Ami';
      case FriendState.REJECTED:
        return 'Demande rejetée';
      case FriendState.BLOCKED:
        return 'Bloqué';
      default:
        return '';
    }
  }

  sendFriendRequest() {
    this.sending = true;
    this.subscriptions.push(
      this.friendShipService
        .addFriend({
          friendId: this.user?.id ?? 'empty',
        })
        .subscribe({
          next: friendRequest => {
            this.relationShip = friendRequest;
            this.notificationsService.success('Demande envoyée');
          },
          complete: () => (this.sending = false),
        })
    );
  }

  acceptFriend() {
    this.subscriptions.push(
      this.friendShipService
        .updateFriend({
          friendId: this.user?.id ?? 'empty',
          state: FriendState.ACCEPTED,
        })
        .subscribe(response => {
          this.notificationsService.success('Demande acceptée');
          this.relationShip = response;
        })
    );
  }

  rejectFriend() {
    this.subscriptions.push(
      this.friendShipService
        .updateFriend({
          friendId: this.user?.id ?? 'empty',
          state: FriendState.REJECTED,
        })
        .subscribe(response => {
          this.notificationsService.success('Demande rejetée');
          this.relationShip = response;
        })
    );
  }

  blockFriend() {
    this.subscriptions.push(
      this.friendShipService
        .updateFriend({
          friendId: this.user?.id ?? 'empty',
          state: FriendState.BLOCKED,
        })
        .subscribe(response => {
          this.notificationsService.success('Utilisateur bloqué');
          this.relationShip = response;
        })
    );
  }

  deleteFriend() {
    this.subscriptions.push(
      this.friendShipService
        .deleteFriend(this.user?.id ?? 'empty')
        .subscribe(() => {
          this.notificationsService.success('Ami supprimé');
          this.relationShip = null;
        })
    );
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
      this.subscriptions.push(
        this.userService
          .updateUser(this.user?.id ?? '', updateUser)
          .subscribe(() => {
            this.updateUserSuccess(updateUser);
          })
      );
    } else {
      this.subscriptions.push(
        this.userService.update(updateUser).subscribe(() => {
          this.updateUserSuccess(updateUser);
        })
      );
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

  onRoleChange(role: string, checked: boolean): void {
    if (checked) {
      this.subscriptions.push(
        this.userService
          .addUserRole(this.user?.id ?? '', { role })
          .subscribe(() => {
            this.notificationsService.success('Rôle ajouté');
          })
      );
    } else {
      this.subscriptions.push(
        this.userService
          .removeUserRole(this.user?.id ?? '', { role })
          .subscribe(() => {
            this.notificationsService.success('Rôle retiré');
          })
      );
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

  protected readonly FriendState = FriendState;

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

export function getBadgeColor(role: string): string {
  const index = role
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return badgeColors[index % badgeColors.length];
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
