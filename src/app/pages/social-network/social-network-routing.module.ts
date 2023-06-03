import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks, navigationRoot } from '../../app-routing.module';
import { SocialNetworkHomeComponent } from './social-network-home/social-network-home.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserViewComponent } from './user-view/user-view.component';
import { FriendshipComponent } from './friendship/friendship.component';
import { MessagingComponent } from './messaging/messaging.component';

export const socialNetworkLinks: NavigationLinks<
  'search_user' | 'user_profile' | 'chat' | 'relations'
> = {
  search_user: {
    path: 'search-user',
    name: 'Rechercher un utilisateur',
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

export const userProfilViewLinks = `/${navigationRoot.socialNetwork.path}/${socialNetworkLinks.user_profile.path}/`;

const routes: Routes = [
  {
    path: socialNetworkLinks.search_user.path,
    component: UserSearchComponent,
    data: { title: socialNetworkLinks.search_user.name },
  },
  {
    path: socialNetworkLinks.user_profile.path + '/:id',
    component: UserViewComponent,
    data: { title: socialNetworkLinks.user_profile.name },
  },
  {
    path: socialNetworkLinks.chat.path,
    component: MessagingComponent,
    data: { title: socialNetworkLinks.chat.name },
  },
  {
    path: socialNetworkLinks.chat.path + '/:id',
    component: MessagingComponent,
    data: { title: socialNetworkLinks.chat.name },
  },
  {
    path: socialNetworkLinks.relations.path,
    component: FriendshipComponent,
    data: { title: socialNetworkLinks.relations.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialNetworkRoutingModule {}
