import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RatingResponse } from '../../../../shared/models/rating.models';
import { RatingService } from '../../rating.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';

@Component({
  selector: 'app-rating-view',
  templateUrl: './rating-view.component.html',
  styleUrls: ['./rating-view.component.less'],
})
export class RatingViewComponent {
  @Input() rating: RatingResponse | undefined;
  @Input() editable = false;
  @Input() type?: 'movie' | 'tv';
  @Output() updateRating: EventEmitter<RatingResponse> = new EventEmitter();

  constructor(
    private readonly ratingService: RatingService,
    private readonly notificationsService: NotificationsService
  ) {}

  onUpdateRating(rating: RatingResponse, value: number): void {
    (this.type === 'tv'
      ? this.ratingService.saveTvRating(rating.mediaId, value)
      : this.ratingService.saveMovieRating(rating.mediaId, value)
    ).subscribe(response => {
      this.notificationsService.success('Note mise à jour');
      this.updateRating.emit(response);
      rating.rating = value;
    });
  }
}
