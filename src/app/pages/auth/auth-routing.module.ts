import { NgModule } from '@angular/core';
import { NavigationLinks } from '../../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginRegisterComponent } from './auth-login-register/auth-login-register.component';
import { AuthMyAccountComponent } from './auth-my-account/auth-my-account.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { authGuard } from '../../core/guard/auth.guard';

export const accountLinks: NavigationLinks<
  'login' | 'register' | 'myAccount' | 'logout'
> = {
  login: {
    path: 'login',
    name: 'Connexion',
    // icon: 'login',
  },
  register: {
    path: 'register',
    name: 'Inscription',
    // icon: 'user',
  },
  myAccount: {
    path: 'my-account',
    name: 'Mon compte',
    requiredRole: 'user',
    // icon: 'user',
  },
  logout: {
    path: 'logout',
    name: 'Déconnexion',
    requiredRole: 'user',
    // icon: 'logout',
  },
};

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: accountLinks.login.path,
  },
  {
    path: accountLinks.login.path,
    component: AuthLoginRegisterComponent,
    data: { title: accountLinks.login.name },
  },
  {
    path: accountLinks.register.path,
    component: AuthLoginRegisterComponent,
    data: { title: accountLinks.register.name },
  },
  {
    path: accountLinks.myAccount.path,
    component: AuthMyAccountComponent,
    data: { title: accountLinks.myAccount.name },
    canActivate: [authGuard],
  },
  {
    path: accountLinks.logout.path,
    component: AuthLogoutComponent,
    data: { title: accountLinks.logout.name },
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
