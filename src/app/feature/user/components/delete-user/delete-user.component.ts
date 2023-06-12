import { Component, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthActions } from '../../../../core/auth/store/auth.actions';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import { Store } from '@ngxs/store';
import { navigationRoot } from '../../../../app-routing.module';
import { adminLinks } from '../../../../pages/admin/admin-routing.module';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.less'],
})
export class DeleteUserComponent {
  @Input() admin = false;
  @Input() owner = false;
  @Input() userId = '';

  deleteModalVisible = false;
  deleteModalLoading = false;
  deleteModalError = false;
  deleteModalErrorMessage = '';
  deleteModalSuccess = false;

  constructor(
    private readonly store: Store,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly keycloakService: KeycloakService
  ) {}

  buttonMessage(): string {
    return this.owner ? 'Supprimer mon compte' : 'Supprimer cet utilisateur';
  }

  deletePromptMessage(): string {
    return this.owner
      ? 'Voulez-vous vraiment supprimer votre compte ?'
      : 'Voulez-vous vraiment supprimer cet utilisateur ?';
  }

  deleteSuccessMessage(): string {
    return this.owner
      ? 'Votre compte a été supprimé.'
      : "L'utilisateur a été supprimé.";
  }

  showModal(): void {
    this.deleteModalVisible = true;
  }

  handleCancel(): void {
    if (this.owner) {
      this.handleOwnerCancel();
    } else if (this.admin) {
      this.handleAdminCancel();
    }
  }

  handleDelete(): void {
    if (this.owner) {
      this.handleOwnerDelete();
    } else if (this.admin) {
      this.handleAdminDelete();
    }
  }

  handleOwnerDelete(): void {
    this.deleteModalLoading = true;
    this.userService.delete().subscribe({
      next: () => {
        this.deleteModalLoading = false;
        this.deleteModalSuccess = true;
      },
      error: (error: HttpErrorResponse) => {
        this.deleteModalLoading = false;
        this.deleteModalError = true;
        this.deleteModalErrorMessage = error.error.message;
      },
    });
  }

  handleOwnerCancel(): void {
    if (this.deleteModalLoading) {
      return;
    }
    if (this.deleteModalError) {
      this.deleteModalError = false;
    }
    if (this.deleteModalSuccess) {
      this.store.dispatch(new AuthActions.Logout());
      this.keycloakService.clearToken();
      sessionStorage.clear();
      this.router.navigate(['/home']).finally(() => {
        this.keycloakService.logout(window.location.origin);
      });
    }
    this.deleteModalVisible = false;
  }

  handleAdminDelete(): void {
    this.deleteModalLoading = true;
    this.userService.adminDeleteUser(this.userId).subscribe({
      next: () => {
        this.deleteModalLoading = false;
        this.deleteModalSuccess = true;
      },
      error: (error: HttpErrorResponse) => {
        this.deleteModalLoading = false;
        this.deleteModalError = true;
        this.deleteModalErrorMessage = error.error.message;
      },
    });
  }

  handleAdminCancel(): void {
    if (this.deleteModalLoading) {
      return;
    }
    if (this.deleteModalError) {
      this.deleteModalError = false;
    }
    if (this.deleteModalSuccess) {
      sessionStorage.clear();
      this.router
        .navigate([`${navigationRoot.admin.path}/${adminLinks.users.path}`])
        .finally();
    }
    this.deleteModalVisible = false;
  }
}
