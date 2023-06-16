import { Component, Input } from '@angular/core';
import { UploadScanService } from '../../upload-scan.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.less'],
})
export class ScanComponent {
  @Input() disabled = false;

  constructor(
    private readonly uploadScanService: UploadScanService,
    private readonly notificationsService: NotificationsService
  ) {}

  onScanMovies(): void {
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
    });
  }

  onScanSeries(): void {
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
    });
  }
}
