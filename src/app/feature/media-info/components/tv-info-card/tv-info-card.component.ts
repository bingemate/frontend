import { Component, Input } from '@angular/core';
import { TvShowResponse } from '../../../../shared/models/media.models';
import { Router } from '@angular/router';
import { tvShowViewPath } from '../../../../pages/medias/medias-routing.module';

@Component({
  selector: 'app-tv-info-card',
  templateUrl: './tv-info-card.component.html',
  styleUrls: ['./tv-info-card.component.less'],
})
export class TvInfoCardComponent {
  @Input() tv?: TvShowResponse;

  constructor(private router: Router) {}

  getRate(): number {
    return Math.round(this.tv?.voteAverage ?? 0) / 2;
  }

  onViewTvShow(): void {
    this.router
      .navigate([tvShowViewPath, this.tv?.id], {
        onSameUrlNavigation: 'reload',
      })
      .then();
  }
}
