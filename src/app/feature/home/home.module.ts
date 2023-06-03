import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoauthHomeComponent } from './components/noauth-home/noauth-home.component';
import { AuthHomeComponent } from './components/auth-home/auth-home.component';

@NgModule({
  declarations: [NoauthHomeComponent, AuthHomeComponent],
  exports: [NoauthHomeComponent, AuthHomeComponent],
  imports: [CommonModule],
})
export class HomeModule {}
