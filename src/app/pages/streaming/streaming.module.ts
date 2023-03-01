import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamingRoutingModule } from './streaming-routing.module';
import { StreamComponent } from './stream/stream.component';

@NgModule({
  declarations: [StreamComponent],
  imports: [CommonModule, StreamingRoutingModule],
})
export class StreamingModule {}
