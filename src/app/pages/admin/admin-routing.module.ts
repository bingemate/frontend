import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationLinks, navigationRoot } from '../../app-routing.module';
import { UploadScanComponent } from './upload-scan/upload-scan.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';

export const adminLinks: NavigationLinks<'upload' | 'users'> = {
  upload: {
    path: 'upload',
    name: 'Envoi de médias',
    icon: 'upload',
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
