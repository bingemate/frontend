import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BooleanYesNoPipe } from './pipes/boolean-yes-no.pipe';
import { EmptyStringPipe } from './pipes/empty-string.pipe';
import { MediaLinkPipe } from './pipes/media-link.pipe';
import { UsernamePipe } from './pipes/username.pipe';
import { MediaNamePipe } from './pipes/media-name.pipe';
import { TvShowWatchlistStatusPipe } from './pipes/episode-watchlist-status.pipe';
import { MovieWatchlistStatusPipe } from './pipes/movie-watchlist-status.pipe';
import { HoursPipe } from './pipes/hours.pipe';
import { DurationPipe } from './pipes/duration.pipe';

@NgModule({
  declarations: [
    BooleanYesNoPipe,
    EmptyStringPipe,
    MediaLinkPipe,
    UsernamePipe,
    MediaNamePipe,
    TvShowWatchlistStatusPipe,
    MovieWatchlistStatusPipe,
    HoursPipe,
    DurationPipe,
  ],
  imports: [CommonModule, NzCardModule, NzTabsModule],
  exports: [
    BooleanYesNoPipe,
    EmptyStringPipe,
    MediaLinkPipe,
    UsernamePipe,
    MediaNamePipe,
    TvShowWatchlistStatusPipe,
    MovieWatchlistStatusPipe,
    HoursPipe,
    DurationPipe,
  ],
})
export class SharedModule {}
