import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ActorSearchState } from '../../store/actor-search.state';
import { Observable, Subject, Subscription } from 'rxjs';
import { ActorsResults } from '../../../../shared/models/media.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { debounceTime } from 'rxjs/operators';
import { ActorSearchActions } from '../../store/actor-search.actions';

@Component({
  selector: 'app-actor-search',
  templateUrl: './actor-search.component.html',
  styleUrls: ['./actor-search.component.less'],
})
export class ActorSearchComponent {
  isOnPhone = false;

  @Select(ActorSearchState.query)
  query$!: Observable<string>;
  query = '';
  @Select(ActorSearchState.loading)
  searching$!: Observable<boolean>;
  @Select(ActorSearchState.actors)
  results$!: Observable<ActorsResults>;
  @Select(ActorSearchState.currentPage)
  currentPage$!: Observable<number>;
  @Select(ActorSearchState.adult)
  adult$!: Observable<boolean>;

  adultCounter = 0;

  inputSubject: Subject<string> = new Subject<string>();
  private subscription: Subscription;
  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store
  ) {
    this.subscription = this.inputSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.search();
      });
  }

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
  }

  onInput() {
    this.inputSubject.next(this.query);
  }

  manualSearch() {
    this.subscription.unsubscribe();
    this.search();
    this.subscription = this.inputSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.search();
      });
  }

  search() {
    if (this.adultCounter < 8) {
      this.adultCounter = 0;
    }
    if (this.query.length > 0) {
      this.store.dispatch(
        new ActorSearchActions.Search({
          query: this.query,
          page: 1,
        })
      );
    }
  }

  click() {
    this.adultCounter++;
    if (this.adultCounter === 8) {
      this.store.dispatch(new ActorSearchActions.Adult(true));
      this.manualSearch();
    }
  }

  onPageChange(page: number): void {
    this.store.dispatch(new ActorSearchActions.PageChange(page));
  }

  adultUnchecked() {
    this.adultCounter = 0;
    this.store.dispatch(new ActorSearchActions.Adult(false));
    this.manualSearch();
  }

  protected readonly Math = Math;
}
