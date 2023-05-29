import { Component } from '@angular/core';
import { TvShowResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';

@Component({
  selector: 'app-tv-view',
  templateUrl: './tv-view.component.html',
  styleUrls: ['./tv-view.component.less'],
})
export class TvViewComponent {
  tvId?: number;
  tv?: TvShowResponse;
  tvRecommendations: TvShowResponse[] = [];

  constructor(
    currentRoute: ActivatedRoute,
    private mediaInfoService: MediaInfoService,
    private mediaDiscoverService: MediaDiscoverService
  ) {
    currentRoute.params.subscribe(params => {
      this.tvId = params['id'];
      this.onGetTvShow();
    });
  }

  onGetTvShow() {
    this.mediaInfoService.getTvShowInfo(this.tvId ?? 0).subscribe(tv => {
      this.tv = tv;
    });
    this.mediaDiscoverService
      .getTvShowRecommendations(this.tvId ?? 0)
      .subscribe(tvRecommendations => {
        this.tvRecommendations = tvRecommendations;
      });
  }
}
