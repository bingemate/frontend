import { Component, Input } from '@angular/core';
import { RatingResponse } from '../../../../shared/models/rating.models';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.less'],
})
export class RatingListComponent {
  @Input() ratings: RatingResponse[] = [];
  @Input() showMedia = false;
  @Input() editable = false;

  getAuthor(rating: RatingResponse) {
    return this.showMedia ? rating.mediaId.toString() : rating.userId;
  }
}
