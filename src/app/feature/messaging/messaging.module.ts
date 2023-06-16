import { NgModule } from '@angular/core';
import { MessagingService } from './messaging.service';
import { NgxsModule } from '@ngxs/store';
import { MessagingState } from './store/messaging.state';

@NgModule({
  imports: [NgxsModule.forFeature([MessagingState])],
  providers: [MessagingService],
})
export class MessagingModule {}
