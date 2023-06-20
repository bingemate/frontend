import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobLog } from '../../../shared/models/upload-scan.models';
import { UploadScanService } from '../../../feature/upload-scan/upload-scan.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-upload-scan',
  templateUrl: './upload-scan.component.html',
  styleUrls: ['./upload-scan.component.less'],
})
export class UploadScanComponent implements OnInit, OnDestroy {
  jobRunning = false;
  jobLogs: JobLog[] = [];

  private jobSubscription: Subscription = new Subscription();
  private subscriptions: Subscription[] = [];
  private intervalId!: number;

  constructor(private uploadScanService: UploadScanService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.uploadScanService.getJobLogs().subscribe(logs => {
        this.jobLogs = logs;
      })
    );
    this.intervalId = window.setInterval(() => {
      this.subscriptions.push(
        this.uploadScanService.isJobRunning().subscribe(running => {
          if (running != this.jobRunning) {
            this.jobRunning = running;
          }
        })
      );
      this.subscriptions.push(
        this.uploadScanService.getJobLogs().subscribe(logs => {
          if (logs.length != this.jobLogs.length) {
            this.jobLogs = logs;
          }
        })
      );
    }, 2000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
    }
    this.jobSubscription.unsubscribe();
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
