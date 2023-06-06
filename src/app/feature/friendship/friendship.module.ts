import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { SharedModule } from '../../shared/shared.module';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [FriendListComponent],
  exports: [FriendListComponent],
  imports: [
    CommonModule,
    NzListModule,
    SharedModule,
    RouterLink,
    NzButtonModule,
    NzIconModule,
  ],
})
export class FriendshipModule {}
