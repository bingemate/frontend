import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HistoryState } from './store/history.state';
import { HistoryService } from './history.service';

@NgModule({
  declarations: [],
  imports: [NgxsModule.forFeature([HistoryState])],
  providers: [HistoryService],
})
export class HistoryModule {}
