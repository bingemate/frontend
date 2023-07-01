import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, Observable, Subject, Subscription } from 'rxjs';
import {
  MovieResults,
  TvShowResults,
} from '../../../../shared/models/media.models';
import { Select, Store } from '@ngxs/store';
import { MediaSearchState } from '../../store/media-search.state';
import { MediaSearchActions } from '../../store/media-search.actions';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-media-search',
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.less'],
})
export class MediaSearchComponent implements OnInit, OnDestroy {
  isOnPhone = false;

  @Select(MediaSearchState.query)
  query$!: Observable<string>;
  query = '';
  @Select(MediaSearchState.moviesLoading)
  searchingMovie$!: Observable<boolean>;
  @Select(MediaSearchState.tvShowsLoading)
  searchingTv$!: Observable<boolean>;

  onlyAvailable = false;

  inputSubject: Subject<string> = new Subject<string>();
  subscriptions: Subscription[] = [];

  @Select(MediaSearchState.movies)
  movieResults$!: Observable<MovieResults>;
  @Select(MediaSearchState.moviesCurrentPage)
  movieResultsPage$!: Observable<number>;
  @Select(MediaSearchState.tvShows)
  tvResults$!: Observable<TvShowResults>;
  @Select(MediaSearchState.tvShowsCurrentPage)
  tvResultsPage$!: Observable<number>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store
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
      this.query$.subscribe(query => {
        this.query = query;
      })
    );
    this.search();
  }

  onSearch() {
    this.inputSubject.next(this.query);
  }

  search() {
    this.subscriptions.push(
      this.inputSubject
        .pipe(
          debounceTime(1000),
          filter(query => query.length > 0)
        )
        .subscribe(query =>
          this.store.dispatch(
            new MediaSearchActions.Search({
              query,
              onlyAvailable: this.onlyAvailable,
            })
          )
        )
    );
  }

  onMoviesPageChange(page: number): void {
    this.store.dispatch(
      new MediaSearchActions.SearchMovie({
        page,
        onlyAvailable: this.onlyAvailable,
      })
    );
  }

  onTvShowsPageChange(page: number): void {
    this.store.dispatch(
      new MediaSearchActions.SearchTv({
        page,
        onlyAvailable: this.onlyAvailable,
      })
    );
  }

  onOnlyAvailableChecked(checked: boolean) {
    this.onlyAvailable = checked;
    this.onSearch();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  protected readonly Math = Math;
}
