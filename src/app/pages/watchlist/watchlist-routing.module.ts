import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { WatchtlistComponent } from './watchtlist/watchtlist.component';
import { WatchtlistCalendarComponent } from './watchtlist-calendar/watchtlist-calendar.component';

export const watchlistLinks: NavigationLinks<'lists' | 'calendar'> = {
  lists: {
    name: 'Listes',
    path: 'lists',
  },
  calendar: {
    name: 'Calendrier',
    path: 'calendar',
  },
};

const routes: Routes = [
  {
    path: watchlistLinks.lists.path,
    component: WatchtlistComponent,
  },
  {
    path: watchlistLinks.calendar.path,
    component: WatchtlistCalendarComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistRoutingModule {}
