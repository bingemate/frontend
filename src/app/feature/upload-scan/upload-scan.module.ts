import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScanComponent } from './components/scan/scan.component';
import { UploadComponent } from './components/upload/upload.component';
import { UploadScanService } from './upload-scan.service';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@NgModule({
  declarations: [ScanComponent, UploadComponent],
  exports: [UploadComponent, ScanComponent],
  imports: [
    CommonModule,
    NzUploadModule,
    NzIconModule,
    NzButtonModule,
    NzListModule,
    NzSpaceModule,
    NzGridModule,
    NzPipesModule,
    NzProgressModule,
    NzSpinModule,
  ],
  providers: [UploadScanService],
})
export class UploadScanModule {}
