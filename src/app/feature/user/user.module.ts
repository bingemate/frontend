import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSearchComponent } from './components/user-search/user-search.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSearchState } from './store/user-search.state';
import { NgxsModule } from '@ngxs/store';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { UserListComponent } from './components/user-list/user-list.component';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NzListModule } from 'ng-zorro-antd/list';
import { RouterLink } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

@NgModule({
  declarations: [UserSearchComponent, UserListComponent, UserInfoComponent],
  imports: [
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzProgressModule,
    NzWaveModule,
    ReactiveFormsModule,
    FormsModule,
    NgxsModule.forFeature([UserSearchState]),
    NzEmptyModule,
    NzListModule,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    RouterLink,
    NzTagModule,
    NzDescriptionsModule,
  ],
  exports: [UserSearchComponent, UserInfoComponent],
})
export class UserModule {}
