import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { MediasMediaListComponent } from './medias-media-list/medias-media-list.component';

export const mediasLinks: NavigationLinks<'list' | 'search' | 'view'> = {
  list: {
    path: 'list',
    name: 'Liste des médias',
  },
  search: {
    path: 'search',
    name: 'Rechercher un média',
  },
  view: {
    path: 'view',
    name: 'Média',
  },
};

const routes: Routes = [
  {
    path: mediasLinks.list.path,
    component: MediasMediaListComponent,
    data: { title: mediasLinks.list.name },
  },
  {
    path: mediasLinks.search.path,
    component: MediasMediaListComponent,
    data: { title: mediasLinks.search.name },
  },
  {
    path: mediasLinks.view.path,
    component: MediasMediaListComponent,
    data: { title: mediasLinks.view.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediasRoutingModule {}
