import { Component, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import {
  MovieResponse,
  TvShowResponse,
} from '../../../shared/models/media.models';

@Component({
  selector: 'app-media-search',
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.less'],
})
export class MediaSearchComponent implements OnDestroy {
  query = '';
  searchingMovie = false;
  searchingTv = false;
  inputSubject: Subject<string> = new Subject<string>();
  private subscription: Subscription;

  movieResults: MovieResponse[] = [];
  movieResultsPage = 1;
  movieResultsTotalPages = 0;
  movieResultsTotalResults = 0;
  tvResults: TvShowResponse[] = [];
  tvResultsPage = 1;
  tvResultsTotalPages = 0;
  tvResultsTotalResults = 0;

  constructor(private mediaDiscoverService: MediaDiscoverService) {
    this.subscription = this.inputSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.search();
      });
  }

  onInput() {
    this.inputSubject.next(this.query);
  }

  manualSearch() {
    console.log('Manual Search');
    this.subscription.unsubscribe();
    this.search();
    this.subscription = this.inputSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.search();
      });
  }

  search() {
    if (this.query.length > 0) {
      this.searchMovie();
      this.searchTv();
    }
  }

  private searchTv() {
    this.searchingTv = true;
    this.mediaDiscoverService
      .searchTvShows(this.query, this.tvResultsPage)
      .subscribe({
        next: response => {
          this.tvResults = response.results;
          this.tvResultsTotalPages = response.totalPage;
          this.tvResultsTotalResults = response.totalResult;
        },
        complete: () => {
          this.searchingTv = false;
        },
      });
  }

  private searchMovie() {
    this.searchingMovie = true;
    this.mediaDiscoverService
      .searchMovies(this.query, this.movieResultsPage)
      .subscribe({
        next: response => {
          this.movieResults = response.results;
          this.movieResultsTotalPages = response.totalPage;
          this.movieResultsTotalResults = response.totalResult;
        },
        complete: () => {
          this.searchingMovie = false;
        },
      });
  }

  onMoviesPageChange(page: number): void {
    this.movieResultsPage = page;
    this.searchMovie();
  }

  onTvShowsPageChange(page: number): void {
    this.tvResultsPage = page;
    this.searchTv();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected readonly Math = Math;
}
