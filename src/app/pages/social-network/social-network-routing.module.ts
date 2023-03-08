import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { SocialNetworkHomeComponent } from './social-network-home/social-network-home.component';

export const socialNetworkLinks: NavigationLinks<
  | 'trending'
  | 'social_network_home'
  | 'search_media'
  | 'search_user'
  | 'media'
  | 'user_profile'
  | 'chat'
  | 'relations'
> = {
  trending: {
    path: 'trending',
    name: 'Tendances',
  },
  social_network_home: {
    path: 'home',
    name: 'Réseau social',
  },
  search_media: {
    path: 'search-media',
    name: 'Rechercher un média',
  },
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
    path: socialNetworkLinks.social_network_home.path,
    pathMatch: 'full',
    component: SocialNetworkHomeComponent,
    data: { title: socialNetworkLinks.social_network_home.name },
  },
  {
    path: socialNetworkLinks.search_media.path,
    component: SocialNetworkHomeComponent,
    data: { title: socialNetworkLinks.search_media.name },
  },
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
    path: socialNetworkLinks.user_profile.path,
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
  {
    path: socialNetworkLinks.trending.path,
    component: SocialNetworkHomeComponent,
    data: { title: socialNetworkLinks.trending.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialNetworkRoutingModule {}
