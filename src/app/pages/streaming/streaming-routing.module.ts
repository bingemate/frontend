import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { StreamComponent } from './stream/stream.component';

export const streamingLinks: NavigationLinks<'stream'> = {
  stream: {
    path: 'stream',
    name: 'Stream',
  },
};

const routes: Routes = [
  {
    path: streamingLinks.stream.path,
    component: StreamComponent,
    data: { title: streamingLinks.stream.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamingRoutingModule {}
