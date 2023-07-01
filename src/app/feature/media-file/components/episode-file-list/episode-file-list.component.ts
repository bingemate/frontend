import { Component, OnDestroy, OnInit } from '@angular/core';
import { tvShowViewPath } from '../../../../pages/medias/medias-routing.module';
import { EpisodeFileResults } from '../../../../shared/models/media-file.models';
import { Subject, Subscription, switchMap } from 'rxjs';
import { MediaFileService } from '../../media-file.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { debounceTime } from 'rxjs/operators';
import { getBadgeColor } from 'src/app/feature/user/components/user-info/user-info.component';

@Component({
  selector: 'app-episode-file-list',
  templateUrl: './episode-file-list.component.html',
  styleUrls: ['./episode-file-list.component.less'],
})
export class EpisodeFileListComponent implements OnInit, OnDestroy {
  protected readonly tvShowViewPath = tvShowViewPath;

  episodeFilesResults: EpisodeFileResults = {
    results: [],
    total: 0,
  };
  currentPage = 1;
  pageSize = 10;
  loading = false;
  query = '';
  episodeDeleting = false;

  inputSubject: Subject<string> = new Subject<string>();
  subscriptions: Subscription[] = [];

  constructor(
    private readonly mediaFileService: MediaFileService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit(): void {
    this.search();
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
            this.mediaFileService.searchEpisodeFiles(
              query,
              this.currentPage,
              this.pageSize
            )
          )
        )
        .subscribe(episodeFilesResult => {
          this.episodeFilesResults = episodeFilesResult;
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
    this.episodeDeleting = true;
    this.subscriptions.push(
      this.mediaFileService.deleteMediaFile(id).subscribe({
        next: () => {
          this.notificationsService.success(
            "Le fichier de l'épisode a bien été supprimé"
          );
          this.search();
        },
        complete: () => {
          this.episodeDeleting = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected readonly getBadgeColor = getBadgeColor;
}
