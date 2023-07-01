import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UserSearchState } from '../../store/user-search.state';
import { filter, Observable, Subject, Subscription } from 'rxjs';
import { UserResponse } from '../../../../shared/models/user.models';
import { debounceTime } from 'rxjs/operators';
import { UserSearchActions } from '../../store/user-search.actions';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.less'],
})
export class UserSearchComponent implements OnInit, OnDestroy {
  @Select(UserSearchState.query)
  query$!: Observable<string>;
  query = '';
  @Select(UserSearchState.userSearchLoading)
  searchingUser$!: Observable<boolean>;
  @Select(UserSearchState.users)
  userResults$!: Observable<UserResponse[]>;

  inputSubject: Subject<string> = new Subject<string>();
  subscriptions: Subscription[] = [];

  constructor(private store: Store) {}

  ngOnInit() {
    this.query$.subscribe(query => {
      this.query = query;
    });
  }

  onInput() {
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
            new UserSearchActions.Search({
              query,
              includeRoles: false,
            })
          )
        )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
