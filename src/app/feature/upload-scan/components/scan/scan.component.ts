import { Component, Input, OnDestroy } from '@angular/core';
import { UploadScanService } from '../../upload-scan.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.less'],
})
export class ScanComponent implements OnDestroy {
  @Input() disabled = false;

  private subscriptions: Subscription[] = [];
  constructor(
    private readonly uploadScanService: UploadScanService,
    private readonly notificationsService: NotificationsService
  ) {}

  onScanMovies(): void {
    this.subscriptions.push(
      this.uploadScanService.scanMovies().subscribe({
        next: () => {
          this.notificationsService.success('Scan des films lancé');
        },
        error: err => {
          this.notificationsService.error(
            'Erreur lors du lancé du scan des films',
            err.error
          );
        },
      })
    );
  }

  onScanSeries(): void {
    this.subscriptions.push(
      this.uploadScanService.scanTVShows().subscribe({
        next: () => {
          this.notificationsService.success('Scan des séries lancé');
        },
        error: err => {
          this.notificationsService.error(
            'Erreur lors du lancé du scan des séries',
            err.error
          );
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
