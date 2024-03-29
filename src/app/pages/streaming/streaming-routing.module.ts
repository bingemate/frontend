import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { StreamComponent } from './stream/stream.component';
import { KeycloakGuard } from '../../core/guard/keycloak.guard';

export const streamingLinks: NavigationLinks<'stream'> = {
  stream: {
    path: 'stream',
    name: 'Stream',
    requiredRoles: ['bingemate-subscribed'],
  },
};

const routes: Routes = [
  {
    path: streamingLinks.stream.path + '/:type/:id',
    component: StreamComponent,
    canActivate: [KeycloakGuard],
    data: {
      title: streamingLinks.stream.name,
      requiredRoles: streamingLinks.stream.requiredRoles,
    },
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: streamingLinks.stream.path,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StreamingRoutingModule {}
