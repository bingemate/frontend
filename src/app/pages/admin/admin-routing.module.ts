import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks, navigationRoot } from '../../app-routing.module';
import { UploadScanComponent } from './upload-scan/upload-scan.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { MediaFilesComponent } from './media-files/media-files.component';

export const adminLinks: NavigationLinks<'upload' | 'users' | 'media_files'> = {
  upload: {
    path: 'upload',
    name: 'Envoi / Scan de médias',
    icon: 'upload',
  },
  media_files: {
    path: 'media-files',
    name: 'Fichiers médias',
    icon: 'file',
  },
  users: {
    path: 'users',
    name: 'Utilisateurs',
    icon: 'user',
  },
};

export const uploadLink = `/${navigationRoot.admin.path}/${adminLinks.upload.path}`;

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: adminLinks.users.path,
  },
  {
    path: adminLinks.upload.path,
    component: UploadScanComponent,
    data: { title: adminLinks.upload.name },
  },
  {
    path: adminLinks.users.path,
    component: AdminUsersComponent,
    data: { title: adminLinks.users.name },
  },
  {
    path: adminLinks.media_files.path,
    component: MediaFilesComponent,
    data: { title: adminLinks.media_files.name },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
