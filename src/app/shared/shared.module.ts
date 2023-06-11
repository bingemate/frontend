import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BooleanYesNoPipe } from './pipes/boolean-yes-no.pipe';
import { EmptyStringPipe } from './pipes/empty-string.pipe';
import { MediaLinkPipe } from './pipes/media-link.pipe';
import { UsernamePipe } from './pipes/username.pipe';
import { MovieNamePipe } from './pipes/movie-name.pipe';
import { TvNamePipe } from './pipes/tv-name.pipe';
import { TvShowWatchlistStatusPipe } from './pipes/episode-watchlist-status.pipe';
import { MovieWatchlistStatusPipe } from './pipes/movie-watchlist-status.pipe';
import { HoursPipe } from './pipes/hours.pipe';

@NgModule({
  declarations: [
    AlbumViewComponent,
    BooleanYesNoPipe,
    EmptyStringPipe,
    MediaLinkPipe,
    UsernamePipe,
    MovieNamePipe,
    TvNamePipe,
    TvShowWatchlistStatusPipe,
    MovieWatchlistStatusPipe,
    HoursPipe,
  ],
  imports: [CommonModule, NzCardModule, NzTabsModule],
  exports: [
    AlbumViewComponent,
    BooleanYesNoPipe,
    EmptyStringPipe,
    MediaLinkPipe,
    UsernamePipe,
    MovieNamePipe,
    TvNamePipe,
    TvShowWatchlistStatusPipe,
    MovieWatchlistStatusPipe,
    HoursPipe,
  ],
})
export class SharedModule {}
