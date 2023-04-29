import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { WatchlistComponent } from './watchtlist/watchlist.component';
import { WatchtlistCalendarComponent } from './watchtlist-calendar/watchtlist-calendar.component';
import { PlaylistsComponent } from "./playlists/playlists.component";
import { PlaylistComponent } from "./playlist/playlist.component";

export const watchlistLinks: NavigationLinks<'lists' | 'calendar' | 'playlists'> = {
  lists: {
    name: 'Mes listes',
    path: 'lists',
  },
  calendar: {
    name: 'Calendrier',
    path: 'calendar',
  },
  playlists: {
    name: 'Playlists',
    path: 'playlists',
  },
};

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
    path: watchlistLinks.playlists.path + "/:id",
    component: PlaylistComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistRoutingModule {}
