import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieFileResults } from '../../../../shared/models/media-file.models';
import { Subject, Subscription, switchMap } from 'rxjs';
import { MediaFileService } from '../../media-file.service';
import { debounceTime } from 'rxjs/operators';
import { movieViewPath } from '../../../../pages/medias/medias-routing.module';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { getBadgeColor } from '../../../user/components/user-info/user-info.component';

@Component({
  selector: 'app-movie-file-list',
  templateUrl: './movie-file-list.component.html',
  styleUrls: ['./movie-file-list.component.less'],
})
export class MovieFileListComponent implements OnInit, OnDestroy {
  protected readonly movieViewPath = movieViewPath;

  movieFilesResults: MovieFileResults = {
    results: [],
    total: 0,
  };
  currentPage = 1;
  pageSize = 10;
  loading = false;
  query = '';
  movieDeleting = false;

  inputSubject: Subject<string> = new Subject<string>();
  subscriptions: Subscription[] = [];

  constructor(
    private readonly mediaFileService: MediaFileService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.search();
    this.onSearch();
  }

  onSearch() {
    this.inputSubject.next(this.query);
  }

  search() {
    this.loading = true;
    this.subscriptions.push(
      this.inputSubject
        .pipe(
          debounceTime(1000),
          switchMap(query =>
            this.mediaFileService.searchMovieFiles(
              query,
              this.currentPage,
              this.pageSize
            )
          )
        )
        .subscribe(movieFilesResults => {
          this.movieFilesResults = movieFilesResults;
          this.loading = false;
        })
    );
  }

  onPageIndexChange(pageIndex: number) {
    this.currentPage = pageIndex;
    this.search();
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.search();
  }

  onDelete(id: string) {
    this.movieDeleting = true;
    this.subscriptions.push(
      this.mediaFileService.deleteMediaFile(id).subscribe({
        next: () => {
          this.notificationsService.success(
            'Le fichier du film a bien été supprimé'
          );
          this.search();
        },
        complete: () => {
          this.movieDeleting = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected readonly getBadgeColor = getBadgeColor;
}
