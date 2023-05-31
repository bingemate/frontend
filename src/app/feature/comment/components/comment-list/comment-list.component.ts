import { Component, Input } from '@angular/core';
import { CommentResponse } from '../../../../shared/models/comment.models';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserModel } from '../../../../shared/models/user.models';
import { CommentService } from '../../comment.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.less'],
})
export class CommentListComponent {
  @Input() comments: CommentResponse[] = [];
  @Input() showMedia = false;

  @Select(AuthState.user)
  user$!: Observable<UserModel>;
  user: UserModel | null = null;

  @Select(AuthState.isAdmin)
  isAdmin$!: Observable<boolean>;
  isAdmin = false;

  constructor(
    private commentService: CommentService,
    private notificationsService: NotificationsService
  ) {
    this.user$.subscribe(user => {
      this.user = user;
    });
    this.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  getAuthor(comment: CommentResponse) {
    return this.showMedia ? comment.mediaId.toString() : comment.userId;
  }

  canUpdateOrDeleteComment(comment: CommentResponse): boolean {
    return this.user?.id === comment.userId || this.isAdmin;
  }

  onUpdateComment(comment: CommentResponse, content: string): void {
    this.commentService.updateComment(comment.id, content).subscribe(() => {
      this.notificationsService.success('Commentaire mis à jour');
      comment.content = content;
    });
  }

  onDeleteComment(comment: CommentResponse): void {
    this.commentService.deleteComment(comment.id).subscribe(() => {
      this.notificationsService.success('Commentaire supprimé');
      this.comments = this.comments.filter(c => c.id !== comment.id);
    });
  }
}
