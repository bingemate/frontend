import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BooleanYesNoPipe } from './pipes/boolean-yes-no.pipe';
import { EmptyStringPipe } from './pipes/empty-string.pipe';
import { MediaNamePipe } from './pipes/media-name.pipe';
import { MediaLinkPipe } from './pipes/media-link.pipe';
import { UsernamePipe } from './pipes/username.pipe';
import { MovieNamePipe } from './pipes/movie-name.pipe';
import { TvNamePipe } from './pipes/tv-name.pipe';
import { WatchlistStatusPipe } from './pipes/watchlist-status.pipe';

@NgModule({
  declarations: [
    AlbumViewComponent,
    BooleanYesNoPipe,
    EmptyStringPipe,
    MediaNamePipe,
    MediaLinkPipe,
    UsernamePipe,
    MovieNamePipe,
    TvNamePipe,
    WatchlistStatusPipe,
  ],
  imports: [CommonModule, NzCardModule, NzTabsModule],
  exports: [
    AlbumViewComponent,
    BooleanYesNoPipe,
    EmptyStringPipe,
    MediaNamePipe,
    MediaLinkPipe,
    UsernamePipe,
    MovieNamePipe,
    TvNamePipe,
    WatchlistStatusPipe,
  ],
})
export class SharedModule {}
