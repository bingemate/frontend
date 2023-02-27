import { NgModule } from '@angular/core';
import { NavigationLinks, navigationRoot } from '../../app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginRegisterComponent } from './auth-login-register/auth-login-register.component';
import { AuthMyAccountComponent } from './auth-my-account/auth-my-account.component';

export const accountLinks: NavigationLinks<
  'login' | 'register' | 'my_account' | 'logout'
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
  my_account: {
    path: 'my-account',
    name: 'Mon compte',
    auth: true,
    // icon: 'user',
  },
  logout: {
    path: 'logout',
    name: 'Déconnexion',
    auth: true,
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
    path: accountLinks.my_account.path,
    component: AuthMyAccountComponent,
    data: { title: accountLinks.my_account.name },
  },
  {
    path: accountLinks.logout.path,
    pathMatch: 'full',
    redirectTo: `/${navigationRoot.home.path}`,
    data: { title: accountLinks.logout.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
