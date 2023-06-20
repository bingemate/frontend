import { Component, OnDestroy, OnInit } from '@angular/core';
import { TvShowResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-by-network',
  templateUrl: './tv-by-network.component.html',
  styleUrls: ['./tv-by-network.component.less'],
})
export class TvByNetworkComponent implements OnInit, OnDestroy {
  networkId = 0;
  networkName = '';
  isOnPhone = false;

  tvShows: TvShowResponse[] = [];
  tvShowsPage = 1;
  tvShowsTotalPages = 0;
  tvShowsTotalResults = 0;

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
        this.networkId = params['id'];
        this.getTvShows();
        this.getNetworkName();
      })
    );
  }

  getTvShows(): void {
    this.subscriptions.push(
      this.mediaDiscoverService
        .getTvShowsByNetwork(this.networkId, this.tvShowsPage)
        .subscribe(tvShows => {
          this.tvShowsTotalPages = tvShows.totalPage;
          this.tvShowsTotalResults = tvShows.totalResult;
          this.tvShows = tvShows.results;
        })
    );
  }

  getNetworkName(): void {
    this.subscriptions.push(
      this.mediaAssetsService.getNetwork(this.networkId).subscribe(network => {
        this.networkName = network.name;
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
