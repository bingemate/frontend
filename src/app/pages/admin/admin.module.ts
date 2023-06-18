import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadScanComponent } from './upload-scan/upload-scan.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { UploadScanModule } from '../../feature/upload-scan/upload-scan.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserModule } from '../../feature/user/user.module';
import { MediaFilesComponent } from './media-files/media-files.component';
import { MediaFileModule } from '../../feature/media-file/media-file.module';
import { NzCardModule } from 'ng-zorro-antd/card';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsFeatureModule } from '../../feature/statistics/statistics-feature.module';

@NgModule({
  declarations: [
    UploadScanComponent,
    AdminUsersComponent,
    MediaFilesComponent,
    StatisticsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NzGridModule,
    NzTabsModule,
    UploadScanModule,
    UserModule,
    MediaFileModule,
    NzCardModule,
    StatisticsFeatureModule,
  ],
})
export class AdminModule {}
