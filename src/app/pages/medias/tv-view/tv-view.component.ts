import { Component, OnInit } from '@angular/core';
import { TvShowResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';

@Component({
  selector: 'app-tv-view',
  templateUrl: './tv-view.component.html',
  styleUrls: ['./tv-view.component.less'],
})
export class TvViewComponent implements OnInit {
  tvId?: number;
  tv?: TvShowResponse;

  constructor(
    currentRoute: ActivatedRoute,
    private mediaInfoService: MediaInfoService
  ) {
    currentRoute.params.subscribe(params => {
      this.tvId = params['id'];
    });
  }

  ngOnInit(): void {
    this.mediaInfoService.getTvShowInfo(this.tvId ?? 0).subscribe(tv => {
      this.tv = tv;
    });
  }
}
