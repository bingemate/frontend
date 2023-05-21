import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks, navigationRoot } from '../../app-routing.module';
import { MediasMediaListComponent } from './medias-media-list/medias-media-list.component';
import { TrendingComponent } from './trending/trending.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { MovieByGenreComponent } from './movie-by-genre/movie-by-genre.component';

export const mediasLinks: NavigationLinks<
  'list' | 'search' | 'trending' | 'movie_view' | 'movies_by_genre'
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
  movies_by_genre: {
    path: 'movies-by-genre',
    name: 'Films par genre',
  },
};

export const movieViewPath =
  '/' + navigationRoot.medias.path + '/' + mediasLinks.movie_view.path;

export const moviesByGenrePath =
  '/' + navigationRoot.medias.path + '/' + mediasLinks.movies_by_genre.path;

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
  {
    path: mediasLinks.movies_by_genre.path + '/:id',
    component: MovieByGenreComponent,
    data: { title: mediasLinks.movies_by_genre.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediasRoutingModule {}
