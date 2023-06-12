import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserResults } from '../../../../shared/models/user.models';
import { UserService } from '../../user.service';
import { Subject, Subscription } from 'rxjs';
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

  inputSubject: Subject<string> = new Subject<string>();
  private subscription: Subscription;

  constructor(private readonly userService: UserService) {
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
    this.subscription.unsubscribe();
    this.search();
    this.subscription = this.inputSubject
      .pipe(debounceTime(1000))
      .subscribe(() => {
        this.search();
      });
  }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.loading = true;
    this.userService
      .adminSearchUsers(this.query, this.currentPage, this.pageSize)
      .subscribe(userResults => {
        this.userResults = userResults;
        this.loading = false;
      });
  }

  onPageIndexChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.search();
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.search();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  protected readonly userProfilViewLinks = userProfilViewLinks;
}
