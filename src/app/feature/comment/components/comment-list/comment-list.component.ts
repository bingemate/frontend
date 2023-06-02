import { Component, Input } from '@angular/core';
import { CommentResponse } from '../../../../shared/models/comment.models';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CommentService } from '../../comment.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { userProfilViewLinks } from '../../../../pages/social-network/social-network-routing.module';
import { UserResponse } from '../../../../shared/models/user.models';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.less'],
})
export class CommentListComponent {
  @Input() comments: CommentResponse[] = [];
  @Input() showMedia = false;

  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  user: UserResponse | null = null;

  @Select(AuthState.isAdmin)
  isAdmin$!: Observable<boolean>;
  isAdmin = false;

  readonly userViewLink = userProfilViewLinks;

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