import { Component, Input } from '@angular/core';
import { TvShowResponse } from '../../../../shared/models/media.models';

@Component({
  selector: 'app-tv-info-card',
  templateUrl: './tv-info-card.component.html',
  styleUrls: ['./tv-info-card.component.less'],
})
export class TvInfoCardComponent {
  @Input() tv?: TvShowResponse;
}
