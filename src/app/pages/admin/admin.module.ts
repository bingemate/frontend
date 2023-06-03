import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadScanComponent } from './upload-scan/upload-scan.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { UploadScanModule } from '../../feature/upload-scan/upload-scan.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserModule } from '../../feature/user/user.module';

@NgModule({
  declarations: [UploadScanComponent, AdminUsersComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzGridModule,
    NzTabsModule,
    UploadScanModule,
    UserModule,
  ],
})
export class AdminModule {}
