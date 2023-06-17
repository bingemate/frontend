import { NgModule } from '@angular/core';
import { WatchTogetherService } from './watch-together.service';
import { NgxsModule } from '@ngxs/store';
import { WatchTogetherState } from './store/watch-together.state';

@NgModule({
  imports: [NgxsModule.forFeature([WatchTogetherState])],
  providers: [WatchTogetherService],
})
export class WatchTogetherModule {}
