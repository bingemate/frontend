import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaSearchComponent } from './components/media-search/media-search.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { MediaInfoModule } from '../media-info/media-info.module';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { MediaSearchState } from './store/media-search.state';
import { NgxsModule } from '@ngxs/store';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { ActorSearchState } from './store/actor-search.state';
import { ActorSearchComponent } from './components/actor-search/actor-search.component';

@NgModule({
  declarations: [MediaSearchComponent, ActorSearchComponent],
  imports: [
    CommonModule,
    NzGridModule,
    NzCardModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzProgressModule,
    NzTabsModule,
    NzEmptyModule,
    MediaInfoModule,
    NzPaginationModule,
    NgxsModule.forFeature([MediaSearchState, ActorSearchState]),
    NzCheckboxModule,
    NzSpaceModule,
  ],
  exports: [MediaSearchComponent, ActorSearchComponent],
})
export class MediaSearchModule {}
