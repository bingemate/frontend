import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks, navigationRoot } from '../../app-routing.module';
import { TrendingComponent } from './trending/trending.component';
import { MovieViewComponent } from './movie-view/movie-view.component';
import { MovieByGenreComponent } from './movie-by-genre/movie-by-genre.component';
import { MovieByActorComponent } from './movie-by-actor/movie-by-actor.component';
import { MovieByStudioComponent } from './movie-by-studio/movie-by-studio.component';
import { TvViewComponent } from './tv-view/tv-view.component';
import { TvByGenreComponent } from './tv-by-genre/tv-by-genre.component';
import { TvByNetworkComponent } from './tv-by-network/tv-by-network.component';
import { TvByActorComponent } from './tv-by-actor/tv-by-actor.component';
import { SearchComponent } from './media-search/search.component';
import { MediaByActorComponent } from './media-by-actor/media-by-actor.component';

export const mediasLinks: NavigationLinks<
  | 'search'
  | 'trending'
  | 'movie_view'
  | 'media_by_actor'
  | 'movies_by_genre'
  | 'movies_by_actor'
  | 'movies_by_studio'
  | 'tv_show_view'
  | 'tv_shows_by_genre'
  | 'tv_show_by_actor'
  | 'tv_shows_by_network'
> = {
  trending: {
    path: 'trending',
    name: 'Tendances',
  },
  search: {
    path: 'search',
    name: 'Rechercher',
  },
  movie_view: {
    path: 'movie-view',
    name: 'Film',
  },
  media_by_actor: {
    path: 'media-by-actor',
    name: 'Médias par acteur',
  },
  movies_by_genre: {
    path: 'movies-by-genre',
    name: 'Films par genre',
  },
  movies_by_actor: {
    path: 'movies-by-actor',
    name: 'Films par acteur',
  },
  movies_by_studio: {
    path: 'movies-by-studio',
    name: 'Films par studio',
  },
  tv_show_view: {
    path: 'tv-show-view',
    name: 'Série',
  },
  tv_shows_by_genre: {
    path: 'tv-shows-by-genre',
    name: 'Séries par genre',
  },
  tv_show_by_actor: {
    path: 'tv-shows-by-actor',
    name: 'Séries par acteur',
  },
  tv_shows_by_network: {
    path: 'tv-shows-by-network',
    name: 'Séries par network',
  },
};

export const mediaSearchPath =
  '/' + navigationRoot.medias.path + '/' + mediasLinks.search.path;

export const movieViewPath =
  '/' + navigationRoot.medias.path + '/' + mediasLinks.movie_view.path;

export const tvShowViewPath =
  '/' + navigationRoot.medias.path + '/' + mediasLinks.tv_show_view.path;

export const mediaByActorPath =
  '/' + navigationRoot.medias.path + '/' + mediasLinks.media_by_actor.path;

const routes: Routes = [
  {
    path: mediasLinks.search.path,
    component: SearchComponent,
    data: { title: mediasLinks.search.name },
  },
  {
    path: mediasLinks.trending.path,
    component: TrendingComponent,
    data: { title: mediasLinks.trending.name },
  },
  {
    path: mediasLinks.media_by_actor.path + '/:id',
    component: MediaByActorComponent,
    data: { title: mediasLinks.media_by_actor.name },
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
  {
    path: mediasLinks.movies_by_actor.path + '/:id',
    component: MovieByActorComponent,
    data: { title: mediasLinks.movies_by_actor.name },
  },
  {
    path: mediasLinks.movies_by_studio.path + '/:id',
    component: MovieByStudioComponent,
    data: { title: mediasLinks.movies_by_studio.name },
  },
  {
    path: mediasLinks.tv_show_view.path + '/:id',
    component: TvViewComponent,
    data: { title: mediasLinks.tv_show_view.name },
  },
  {
    path: mediasLinks.tv_shows_by_genre.path + '/:id',
    component: TvByGenreComponent,
    data: { title: mediasLinks.tv_shows_by_genre.name },
  },
  {
    path: mediasLinks.tv_show_by_actor.path + '/:id',
    component: TvByActorComponent,
    data: { title: mediasLinks.tv_show_by_actor.name },
  },
  {
    path: mediasLinks.tv_shows_by_network.path + '/:id',
    component: TvByNetworkComponent,
    data: { title: mediasLinks.tv_shows_by_network.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MediasRoutingModule {}
