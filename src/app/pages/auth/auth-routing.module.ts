import { NgModule } from '@angular/core';
import { NavigationLinks } from '../../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginRegisterComponent } from './auth-login-register/auth-login-register.component';
import { AuthMyAccountComponent } from './auth-my-account/auth-my-account.component';
import { AuthLogoutComponent } from './auth-logout/auth-logout.component';
import { authGuard } from '../../core/guard/auth.guard';
import { KeycloakGuard } from '../../core/guard/keycloak.guard';

export const accountLinks: NavigationLinks<'login' | 'myAccount' | 'logout'> = {
  login: {
    path: 'login',
    name: 'Connexion / Inscription',
    // icon: 'login',
  },
  myAccount: {
    path: 'my-account',
    name: 'Mon compte',
    requiredRoles: [],
    // icon: 'user',
  },
  logout: {
    path: 'logout',
    name: 'Déconnexion',
    requiredRoles: [],
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
    path: accountLinks.myAccount.path,
    component: AuthMyAccountComponent,
    data: { title: accountLinks.myAccount.name },
    canActivate: [KeycloakGuard],
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
