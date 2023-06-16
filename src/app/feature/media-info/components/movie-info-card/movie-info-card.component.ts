import { Component, Input } from '@angular/core';
import { movieViewPath } from 'src/app/pages/medias/medias-routing.module';
import { MovieResponse } from '../../../../shared/models/media.models';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-movie-info-card',
  templateUrl: './movie-info-card.component.html',
  styleUrls: ['./movie-info-card.component.less'],
})
export class MovieInfoCardComponent {
  @Input() movie?: MovieResponse;
  isOnPhone = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
  }

  getRate(): number {
    return Math.round(this.movie?.voteAverage ?? 0) / 2;
  }

  onViewMovie(): void {
    this.router
      .navigate([movieViewPath, this.movie?.id], {
        onSameUrlNavigation: 'reload',
      })
      .then();
  }
}
