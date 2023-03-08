import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumViewComponent } from './components/album-view/album-view.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BooleanYesNoPipe } from './pipes/boolean-yes-no.pipe';
import { EmptyStringPipe } from './pipes/empty-string.pipe';

@NgModule({
  declarations: [AlbumViewComponent, BooleanYesNoPipe, EmptyStringPipe],
  imports: [CommonModule, NzCardModule, NzTabsModule],
  exports: [AlbumViewComponent, BooleanYesNoPipe, EmptyStringPipe],
})
export class SharedModule {}
