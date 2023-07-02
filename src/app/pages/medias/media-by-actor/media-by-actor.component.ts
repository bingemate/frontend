import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Actor,
  MovieResponse,
  TvShowResponse,
} from '../../../shared/models/media.models';
import { Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';

@Component({
  selector: 'app-media-by-actor',
  templateUrl: './media-by-actor.component.html',
  styleUrls: ['./media-by-actor.component.less'],
})
export class MediaByActorComponent implements OnInit, OnDestroy {
  actorId = 0;
  actor: Actor | undefined;

  movies: MovieResponse[] = [];
  moviesPage = 1;
  moviesTotalPages = 0;
  moviesTotalResults = 0;

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
        this.getActor();
        this.getMovies();
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

  getMovies(): void {
    this.subscriptions.push(
      this.mediaDiscoverService
        .getMoviesByActor(this.actorId, this.moviesPage)
        .subscribe(movies => {
          this.moviesTotalPages = movies.totalPage;
          this.moviesTotalResults = movies.totalResult;
          this.movies = movies.results;
        })
    );
  }

  onMoviesPageChange(page: number): void {
    this.moviesPage = page;
    this.getMovies();
  }

  getTvShows(): void {
    if (this.tvShowsPage === 1 && this.tvShows.length === 0) {
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
