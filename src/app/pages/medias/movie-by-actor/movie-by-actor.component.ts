import { Component, OnInit } from '@angular/core';
import { Actor, MovieResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-movie-by-actor',
  templateUrl: './movie-by-actor.component.html',
  styleUrls: ['./movie-by-actor.component.less'],
})
export class MovieByActorComponent implements OnInit {
  actorId = 0;
  actor: Actor | undefined;

  movies: MovieResponse[] = [];
  moviesPage = 1;
  moviesTotalPages = 0;
  moviesTotalResults = 0;
  isOnPhone = false;

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
      this.actorId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getMovies();
    this.getActor();
  }

  getMovies(): void {
    this.mediaDiscoverService
      .getMoviesByActor(this.actorId, this.moviesPage)
      .subscribe(movies => {
        this.moviesTotalPages = movies.totalPage;
        this.moviesTotalResults = movies.totalResult;
        this.movies = movies.results;
      });
  }

  getActor(): void {
    this.mediaAssetsService.getActor(this.actorId).subscribe(actor => {
      this.actor = actor;
    });
  }

  onMoviesPageChange(page: number): void {
    this.moviesPage = page;
    this.getMovies();
  }

  protected readonly Math = Math;
}
