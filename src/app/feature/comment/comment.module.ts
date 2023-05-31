import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommentListComponent, NewCommentComponent],
  imports: [
    CommonModule,
    NzListModule,
    NzButtonModule,
    NzIconModule,
    CdkFixedSizeVirtualScroll,
    CdkVirtualScrollViewport,
    CdkVirtualForOf,
    NzPopconfirmModule,
    NzCommentModule,
    NzSpaceModule,
    NzTypographyModule,
    NzFormModule,
    NzInputModule,
    ReactiveFormsModule,
  ],
  exports: [CommentListComponent, NewCommentComponent],
})
export class CommentModule {}
