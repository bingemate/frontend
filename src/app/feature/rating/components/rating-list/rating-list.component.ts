import { Component, Input } from '@angular/core';
import { RatingResponse } from '../../../../shared/models/rating.models';
import { userProfilViewLinks } from '../../../../pages/social-network/social-network-routing.module';

@Component({
  selector: 'app-rating-list',
  templateUrl: './rating-list.component.html',
  styleUrls: ['./rating-list.component.less'],
})
export class RatingListComponent {
  @Input() ratings: RatingResponse[] = [];
  @Input() showMedia = false;
  @Input() editable = false;
  readonly userViewLink = userProfilViewLinks;
}
