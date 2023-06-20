import { Component, OnDestroy, OnInit } from '@angular/core';
import { MediaFileService } from '../../media-file.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-file-stats',
  templateUrl: './file-stats.component.html',
  styleUrls: ['./file-stats.component.less'],
})
export class FileStatsComponent implements OnInit, OnDestroy {
  mediaFileTotalSize = 0;
  mediaFileCount = 0;
  availableDiskSpace = 0;

  subscriptions: Subscription[] = [];
  constructor(private readonly mediaFileService: MediaFileService) {}

  ngOnInit(): void {
    this.getMediaFileTotalSize();
    this.countMediaFiles();
    this.getAvailableDiskSpace();
  }

  refreshData(): void {
    this.getMediaFileTotalSize();
    this.countMediaFiles();
    this.getAvailableDiskSpace();
  }

  getMediaFileTotalSize(): void {
    this.subscriptions.push(
      this.mediaFileService.getMediaFileTotalSize().subscribe(size => {
        this.mediaFileTotalSize = size;
      })
    );
  }

  countMediaFiles(): void {
    this.subscriptions.push(
      this.mediaFileService.countMediaFiles().subscribe(count => {
        this.mediaFileCount = count;
      })
    );
  }

  getAvailableDiskSpace(): void {
    this.subscriptions.push(
      this.mediaFileService.availableSpace().subscribe(space => {
        this.availableDiskSpace = space;
      })
    );
  }

  availableDiskSpacePercent(): string {
    return (
      (this.mediaFileTotalSize /
        (this.mediaFileTotalSize + this.availableDiskSpace)) *
      100
    ).toFixed(2);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
