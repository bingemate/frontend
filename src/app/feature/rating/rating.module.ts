import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingListComponent } from './components/rating-list/rating-list.component';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { RatingViewComponent } from './components/rating-view/rating-view.component';

@NgModule({
  declarations: [RatingListComponent, RatingViewComponent],
  imports: [
    CommonModule,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    CdkVirtualScrollViewport,
    NzButtonModule,
    NzCommentModule,
    NzIconModule,
    NzListModule,
    NzPopconfirmModule,
    NzTypographyModule,
    NzWaveModule,
    NzRateModule,
    FormsModule,
  ],
  exports: [RatingListComponent, RatingViewComponent],
})
export class RatingModule {}
