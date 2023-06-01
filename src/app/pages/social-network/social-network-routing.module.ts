import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { SocialNetworkHomeComponent } from './social-network-home/social-network-home.component';

export const socialNetworkLinks: NavigationLinks<
  'search_user' | 'media' | 'user_profile' | 'chat' | 'relations'
> = {
  search_user: {
    path: 'search-user',
    name: 'Rechercher un utilisateur',
  },
  media: {
    path: 'media',
    name: 'Média',
  },
  user_profile: {
    path: 'user-profile',
    name: 'Profil utilisateur',
  },
  chat: {
    path: 'chat',
    name: 'Conversations',
  },
  relations: {
    path: 'relations',
    name: 'Mes relations',
  },
};

const routes: Routes = [
  {
    path: socialNetworkLinks.search_user.path,
    component: SocialNetworkHomeComponent,
    data: { title: socialNetworkLinks.search_user.name },
  },
  {
    path: socialNetworkLinks.media.path,
    component: SocialNetworkHomeComponent,
    data: { title: socialNetworkLinks.media.name },
  },
  {
    path: socialNetworkLinks.user_profile.path + '/:id',
    component: SocialNetworkHomeComponent,
    data: { title: socialNetworkLinks.user_profile.name },
  },
  {
    path: socialNetworkLinks.chat.path,
    component: SocialNetworkHomeComponent,
    data: { title: socialNetworkLinks.chat.name },
  },
  {
    path: socialNetworkLinks.relations.path,
    component: SocialNetworkHomeComponent,
    data: { title: socialNetworkLinks.relations.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialNetworkRoutingModule {}
