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
import { CdkFixedSizeVirtualScroll, CdkVirtualForOf, CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { NzListModule } from 'ng-zorro-antd/list';
import { RouterLink } from '@angular/router';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { AdminUserListComponent } from './components/admin-user-list/admin-user-list.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';
import { DeleteUserComponent } from './components/delete-user/delete-user.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { SharedModule } from '../../shared/shared.module';
import { PaymentModule } from '../subscription/payment.module';

@NgModule({
  declarations: [
    UserSearchComponent,
    UserListComponent,
    UserInfoComponent,
    AdminUserListComponent,
    DeleteUserComponent,
    UpdatePasswordComponent,
  ],
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
    NzFormModule,
    NzSpaceModule,
    NzCheckboxModule,
    NzTabsModule,
    NzTableModule,
    NzModalModule,
    NzResultModule,
    NzSpinModule,
    NzPopoverModule,
    NzPopconfirmModule,
    NzSelectModule,
    SharedModule,
    PaymentModule,
  ],
  exports: [
    UserSearchComponent,
    UserInfoComponent,
    AdminUserListComponent,
    UpdatePasswordComponent,
  ],
})
export class UserModule {}
