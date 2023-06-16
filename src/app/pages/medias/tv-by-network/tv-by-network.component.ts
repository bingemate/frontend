import { Component, OnInit } from '@angular/core';
import { TvShowResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-tv-by-network',
  templateUrl: './tv-by-network.component.html',
  styleUrls: ['./tv-by-network.component.less'],
})
export class TvByNetworkComponent implements OnInit {
  networkId = 0;
  networkName = '';
  isOnPhone = false;

  tvShows: TvShowResponse[] = [];
  tvShowsPage = 1;
  tvShowsTotalPages = 0;
  tvShowsTotalResults = 0;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private mediaDiscoverService: MediaDiscoverService,
    private mediaAssetsService: MediaAssetsService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
    this.route.params.subscribe(params => {
      this.networkId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getTvShows();
    this.getNetworkName();
  }

  getTvShows(): void {
    this.mediaDiscoverService
      .getTvShowsByNetwork(this.networkId, this.tvShowsPage)
      .subscribe(tvShows => {
        this.tvShowsTotalPages = tvShows.totalPage;
        this.tvShowsTotalResults = tvShows.totalResult;
        this.tvShows = tvShows.results;
      });
  }

  getNetworkName(): void {
    this.mediaAssetsService.getNetwork(this.networkId).subscribe(network => {
      this.networkName = network.name;
    });
  }

  onTvShowsPageChange(page: number): void {
    this.tvShowsPage = page;
    this.getTvShows();
  }

  protected readonly Math = Math;
}
