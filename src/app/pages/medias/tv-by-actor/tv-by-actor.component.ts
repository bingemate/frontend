import { Component, OnInit } from '@angular/core';
import { Actor, TvShowResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';

@Component({
  selector: 'app-tv-by-actor',
  templateUrl: './tv-by-actor.component.html',
  styleUrls: ['./tv-by-actor.component.less'],
})
export class TvByActorComponent implements OnInit {
  actorId = 0;
  actor: Actor | undefined;

  tvShows: TvShowResponse[] = [];
  tvShowsPage = 1;
  tvShowsTotalPages = 0;
  tvShowsTotalResults = 0;

  constructor(
    private route: ActivatedRoute,
    private mediaDiscoverService: MediaDiscoverService,
    private mediaAssetsService: MediaAssetsService
  ) {
    this.route.params.subscribe(params => {
      this.actorId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getTvShows();
    this.getActor();
  }

  getTvShows(): void {
    this.mediaDiscoverService
      .getTvShowsByActor(this.actorId, this.tvShowsPage)
      .subscribe(tvShows => {
        this.tvShowsTotalPages = tvShows.totalPage;
        this.tvShowsTotalResults = tvShows.totalResult;
        this.tvShows = tvShows.results;
      });
  }

  getActor(): void {
    this.mediaAssetsService.getActor(this.actorId).subscribe(actor => {
      this.actor = actor;
    });
  }

  onTvShowsPageChange(page: number): void {
    this.tvShowsPage = page;
    this.getTvShows();
  }

  protected readonly Math = Math;
}
