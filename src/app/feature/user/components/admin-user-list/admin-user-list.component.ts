import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UserResponse,
  UserResults,
} from '../../../../shared/models/user.models';
import { UserService } from '../../user.service';
import { Subject, Subscription, switchMap } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { userProfilViewLinks } from '../../../../pages/social-network/social-network-routing.module';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.less'],
})
export class AdminUserListComponent implements OnInit, OnDestroy {
  userResults: UserResults = {
    results: [],
    total: 0,
  };
  currentPage = 1;
  pageSize = 10;
  loading = false;
  query = '';
  subscriptionModalVisible = false;
  subModalUser?: UserResponse;

  inputSubject: Subject<string> = new Subject<string>();

  subscriptions: Subscription[] = [];

  constructor(private readonly userService: UserService) {}

  onSearch() {
    this.inputSubject.next(this.query);
  }

  ngOnInit(): void {
    this.search();
    this.onSearch();
  }

  search() {
    this.loading = true;
    this.subscriptions.push(
      this.inputSubject
        .pipe(
          debounceTime(1000),
          switchMap(query =>
            this.userService.adminSearchUsers(
              query,
              this.currentPage,
              this.pageSize
            )
          )
        )
        .subscribe(userResults => {
          this.userResults = userResults;
          this.loading = false;
        })
    );
  }

  onPageIndexChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.onSearch();
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.onSearch();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected readonly userProfilViewLinks = userProfilViewLinks;

  showSubscriptionModal(user: UserResponse) {
    this.subscriptionModalVisible = true;
    this.subModalUser = user;
  }

  closeSubscriptionModal() {
    this.subscriptionModalVisible = false;
  }
}
