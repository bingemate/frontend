import { Component, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UserSearchState } from '../../store/user-search.state';
import { Observable, Subject, Subscription } from 'rxjs';
import { UserResponse } from '../../../../shared/models/user.models';
import { debounceTime } from 'rxjs/operators';
import { UserSearchActions } from '../../store/user-search.actions';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.less'],
})
export class UserSearchComponent implements OnDestroy {
  @Select(UserSearchState.query)
  query$!: Observable<string>;
  query = '';
  @Select(UserSearchState.userSearchLoading)
  searchingUser$!: Observable<boolean>;
  @Select(UserSearchState.users)
  userResults$!: Observable<UserResponse[]>;

  inputSubject: Subject<string> = new Subject<string>();
  private subscription: Subscription;

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
        new UserSearchActions.Search({
          query: this.query,
          includeRoles: false,
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
