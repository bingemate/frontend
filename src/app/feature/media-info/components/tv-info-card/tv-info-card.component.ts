import { Component, Input, OnInit } from '@angular/core';
import { TvShowResponse } from '../../../../shared/models/media.models';
import { tvShowViewPath } from '../../../../pages/medias/medias-routing.module';

@Component({
  selector: 'app-tv-info-card',
  templateUrl: './tv-info-card.component.html',
  styleUrls: ['./tv-info-card.component.less'],
})
export class TvInfoCardComponent implements OnInit {
  tvShowViewPath = tvShowViewPath;
  @Input() tv?: TvShowResponse;

  ngOnInit(): void {
    this.tvShowViewPath = tvShowViewPath + '/' + this.tv?.id;
  }

  getRate(): number {
    return Math.round(this.tv?.voteAverage ?? 0) / 2;
  }
}
