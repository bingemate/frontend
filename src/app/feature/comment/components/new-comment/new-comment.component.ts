import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentResponse } from '../../../../shared/models/comment.models';
import { CommentService } from '../../comment.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.less'],
})
export class NewCommentComponent {
  @Input() mediaId = 0;
  @Input() type?: 'tv-shows' | 'movies';
  @Output() newComment: EventEmitter<CommentResponse> = new EventEmitter();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentService,
    private notificationsService: NotificationsService
  ) {
    this.form = this.formBuilder.group({
      comment: [null, [Validators.maxLength(1000)]],
    });
  }

  onSubmit(): void {
    (this.type === 'movies'
      ? this.commentService.createMovieComment(
          this.mediaId,
          this.form.value.comment
        )
      : this.commentService.createTvShowComment(
          this.mediaId,
          this.form.value.comment
        )
    ).subscribe(comment => {
      this.notificationsService.success('Commentaire ajouté');
      this.newComment.emit(comment);
      this.form.reset();
    });
  }
}
