import { Component, OnDestroy, OnInit } from '@angular/core';
import { TvShowResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-by-genre',
  templateUrl: './tv-by-genre.component.html',
  styleUrls: ['./tv-by-genre.component.less'],
})
export class TvByGenreComponent implements OnInit, OnDestroy {
  genreId = 0;
  genreName = '';

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
        this.genreId = params['id'];
        this.getTvShows();
        this.getGenreName();
      })
    );
  }

  getTvShows(): void {
    this.subscriptions.push(
      this.mediaDiscoverService
        .getTvShowsByGenre(this.genreId, this.tvShowsPage)
        .subscribe(tvShows => {
          this.tvShowsTotalPages = tvShows.totalPage;
          this.tvShowsTotalResults = tvShows.totalResult;
          this.tvShows = tvShows.results;
        })
    );
  }

  getGenreName(): void {
    this.subscriptions.push(
      this.mediaAssetsService.getTvShowGenre(this.genreId).subscribe(genre => {
        this.genreName = genre.name;
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
