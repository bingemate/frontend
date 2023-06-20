import { Component, Input } from '@angular/core';
import { TvShowResponse } from '../../../../shared/models/media.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-tv-list',
  templateUrl: './tv-list.component.html',
  styleUrls: ['./tv-list.component.less'],
})
export class TvListComponent {
  @Input() tvShows: TvShowResponse[] = [];
  isOnPhone = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
  }
}
