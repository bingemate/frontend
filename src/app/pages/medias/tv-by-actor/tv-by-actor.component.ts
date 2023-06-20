import { Component, OnDestroy, OnInit } from '@angular/core';
import { Actor, TvShowResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-by-actor',
  templateUrl: './tv-by-actor.component.html',
  styleUrls: ['./tv-by-actor.component.less'],
})
export class TvByActorComponent implements OnInit, OnDestroy {
  actorId = 0;
  actor: Actor | undefined;

  tvShows: TvShowResponse[] = [];
  tvShowsPage = 1;
  tvShowsTotalPages = 0;
  tvShowsTotalResults = 0;
  isOnPhone = false;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private mediaDiscoverService: MediaDiscoverService,
    private mediaAssetsService: MediaAssetsService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.Handset])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.subscriptions.push(
      this.route.params.subscribe(params => {
        this.actorId = params['id'];
        this.getTvShows();
        this.getActor();
      })
    );
  }

  getTvShows(): void {
    this.subscriptions.push(
      this.mediaDiscoverService
        .getTvShowsByActor(this.actorId, this.tvShowsPage)
        .subscribe(tvShows => {
          this.tvShowsTotalPages = tvShows.totalPage;
          this.tvShowsTotalResults = tvShows.totalResult;
          this.tvShows = tvShows.results;
        })
    );
  }

  getActor(): void {
    this.subscriptions.push(
      this.mediaAssetsService.getActor(this.actorId).subscribe(actor => {
        this.actor = actor;
      })
    );
  }

  onTvShowsPageChange(page: number): void {
    this.tvShowsPage = page;
    this.getTvShows();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected readonly Math = Math;
}
