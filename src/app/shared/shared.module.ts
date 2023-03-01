import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@NgModule({
  declarations: [AlbumViewComponent],
  imports: [CommonModule, NzCardModule, NzTabsModule],
  exports: [AlbumViewComponent],
})
export class SharedModule {}
