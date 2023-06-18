import { Component, Input } from '@angular/core';
import {
  CommentStat,
  Statistic,
} from '../../../../shared/models/statistic.models';

@Component({
  selector: 'app-statistic-view',
  templateUrl: './statistic-view.component.html',
  styleUrls: ['./statistic-view.component.less'],
})
export class StatisticViewComponent {
  @Input()
  episodeStats: Statistic[] = [];
  @Input()
  movieStats: Statistic[] = [];
  @Input()
  commentStats: CommentStat[] = [];
  @Input()
  watchTime = 0;
  @Input()
  commentsCount = 0;
  @Input()
  ratingsCount = 0;
  @Input()
  watchedMediaCount = 0;
}
