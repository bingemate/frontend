import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks, navigationRoot } from '../../app-routing.module';
import { WatchlistComponent } from './watchtlist/watchlist.component';
import { WatchtlistCalendarComponent } from './watchtlist-calendar/watchtlist-calendar.component';
import { PlaylistsComponent } from './playlists/playlists.component';
import { PlaylistComponent } from './playlist/playlist.component';

export const watchlistLinks: NavigationLinks<
  'calendar' | 'lists' | 'playlists'
> = {
  calendar: {
    name: 'Calendrier',
    path: 'calendar',
    hideOnPhone: true,
  },
  lists: {
    name: 'Liste de suivie',
    path: 'lists',
  },
  playlists: {
    name: 'Playlists',
    path: 'playlists',
  },
};

export const playlistViewLinks = `/${navigationRoot.watchlist.path}/${watchlistLinks.playlists.path}`;

const routes: Routes = [
  {
    path: watchlistLinks.lists.path,
    component: WatchlistComponent,
  },
  {
    path: watchlistLinks.calendar.path,
    component: WatchtlistCalendarComponent,
  },
  {
    path: watchlistLinks.playlists.path,
    component: PlaylistsComponent,
  },
  {
    path: watchlistLinks.playlists.path + '/:type/:id',
    component: PlaylistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistRoutingModule {}
