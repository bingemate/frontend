import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks, navigationRoot } from '../../app-routing.module';
import { MediasMediaListComponent } from './medias-media-list/medias-media-list.component';
import { TrendingComponent } from './trending/trending.component';
import { MovieViewComponent } from '../social-network/movie-view/movie-view.component';

export const mediasLinks: NavigationLinks<
  'list' | 'search' | 'trending' | 'movie_view'
> = {
  list: {
    path: 'list',
    name: 'Liste des médias',
  },
  trending: {
    path: 'trending',
    name: 'Tendances',
  },
  search: {
    path: 'search',
    name: 'Rechercher un média',
  },
  movie_view: {
    path: 'movie-view',
    name: 'Film',
  },
};

export const movieViewPath =
  '/' + navigationRoot.medias.path + '/' + mediasLinks.movie_view.path;

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
    path: mediasLinks.trending.path,
    component: TrendingComponent,
    data: { title: mediasLinks.trending.name },
  },
  {
    path: mediasLinks.movie_view.path + '/:id',
    component: MovieViewComponent,
    data: { title: mediasLinks.movie_view.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediasRoutingModule {}
