import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  MovieResults,
  TvShowResults,
} from '../../../../shared/models/media.models';
import { debounceTime } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { MediaSearchState } from '../../store/media-search.state';
import { MediaSearchActions } from '../../store/media-search.actions';

@Component({
  selector: 'app-media-search',
  templateUrl: './media-search.component.html',
  styleUrls: ['./media-search.component.less'],
})
export class MediaSearchComponent implements OnDestroy {
  @Select(MediaSearchState.query)
  query$!: Observable<string>;
  query = '';
  @Select(MediaSearchState.moviesLoading)
  searchingMovie$!: Observable<boolean>;
  @Select(MediaSearchState.tvShowsLoading)
  searchingTv$!: Observable<boolean>;

  onlyAvailable = false;

  inputSubject: Subject<string> = new Subject<string>();
  private subscription: Subscription;

  @Select(MediaSearchState.movies)
  movieResults$!: Observable<MovieResults>;
  @Select(MediaSearchState.moviesCurrentPage)
  movieResultsPage$!: Observable<number>;
  @Select(MediaSearchState.tvShows)
  tvResults$!: Observable<TvShowResults>;
  @Select(MediaSearchState.tvShowsCurrentPage)
  tvResultsPage$!: Observable<number>;

  constructor(private store: Store) {
    this.subscription = this.inputSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.search();
      });
    this.query$.subscribe(query => {
      this.query = query;
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
      this.store.dispatch(
        new MediaSearchActions.Search({
          query: this.query,
          onlyAvailable: this.onlyAvailable,
        })
      );
    }
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
    this.manualSearch();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected readonly Math = Math;
}
