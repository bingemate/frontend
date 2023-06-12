import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileStatsComponent } from './components/file-stats/file-stats.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EpisodeFileListComponent } from './components/episode-file-list/episode-file-list.component';
import { MovieFileListComponent } from './components/movie-file-list/movie-file-list.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzPipesModule } from 'ng-zorro-antd/pipes';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [
    FileStatsComponent,
    EpisodeFileListComponent,
    MovieFileListComponent,
  ],
  exports: [
    FileStatsComponent,
    MovieFileListComponent,
    EpisodeFileListComponent,
  ],
  imports: [
    CommonModule,
    NzCardModule,
    NzFormModule,
    NzStatisticModule,
    NzTypographyModule,
    NzPipesModule,
    NzProgressModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    ReactiveFormsModule,
    FormsModule,
    NzTableModule,
    NzPipesModule,
    RouterLink,
    SharedModule,
    NzTagModule,
    NzPopconfirmModule,
  ],
})
export class MediaFileModule {}
