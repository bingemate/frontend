import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks } from '../../app-routing.module';
import { UploadScanComponent } from './upload-scan/upload-scan.component';

export const uploadLinks: NavigationLinks<'home'> = {
  home: {
    path: '',
    name: 'Upload',
    icon: 'upload',
  },
};

const routes: Routes = [
  {
    path: uploadLinks.home.path,
    pathMatch: 'full',
    component: UploadScanComponent,
    data: { title: uploadLinks.home.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadRoutingModule {}
