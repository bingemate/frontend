import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadScanComponent } from './upload-scan/upload-scan.component';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadScanModule } from '../../feature/upload-scan/upload-scan.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  declarations: [UploadScanComponent],
  imports: [
    CommonModule,
    UploadRoutingModule,
    UploadScanModule,
    NzGridModule,
    NzTabsModule,
  ],
})
export class UploadModule {}
