import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.less'],
})
export class UpdatePasswordComponent {
  updatePasswordForm: FormGroup;

  updatingPassword = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly notificationService: NotificationsService,
    private readonly userService: UserService
  ) {
    this.updatePasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [
        '',
        [Validators.required, this.confirmPasswordValidator],
      ],
    });
  }
  onUpdatePassword() {
    if (this.updatePasswordForm.valid) {
      this.updatingPassword = true;
      this.userService
        .updatePassword({
          password: this.updatePasswordForm.get('newPassword')?.value,
        })
        .subscribe({
          next: () => {
            this.notificationService.success(
              'Mot de passe mis à jour avec succès'
            );
          },
          error: () => {
            this.notificationService.error(
              'Erreur lors de la mise à jour du mot de passe'
            );
          },
          complete: () => {
            this.updatingPassword = false;
            this.updatePasswordForm.reset();
          },
        });
    }
  }

  confirmPasswordValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const newPassword = control.parent?.get('newPassword')?.value;
    const confirmPassword = control.getRawValue();

    if (newPassword !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }
}
