import { Component, Input } from '@angular/core';
import { MovieResponse } from '../../../../shared/models/media.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.less'],
})
export class MovieListComponent {
  @Input() movies: MovieResponse[] = [];
  isOnPhone = false;
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
  }
}
