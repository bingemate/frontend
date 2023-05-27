import { Component, Input } from '@angular/core';
import { TvShowResponse } from '../../../../shared/models/media.models';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.less'],
})
export class TvListComponent {
  @Input() tvShows: TvShowResponse[] = [];
}
