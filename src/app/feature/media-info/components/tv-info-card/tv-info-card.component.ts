import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TvShowResponse } from '../../../../shared/models/media.models';
import { Router } from '@angular/router';
import { tvShowViewPath } from '../../../../pages/medias/medias-routing.module';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tv-info-card',
  templateUrl: './tv-info-card.component.html',
  styleUrls: ['./tv-info-card.component.less'],
})
export class TvInfoCardComponent implements OnInit, OnDestroy {
  @Input() tv?: TvShowResponse;
  isOnPhone = false;

  subscriptions: Subscription[] = [];
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
  }

  getRate(): number {
    return Math.round(this.tv?.voteAverage ?? 0) / 2;
  }

  onViewTvShow(): void {
    this.router
      .navigate([tvShowViewPath, this.tv?.id], {
        onSameUrlNavigation: 'reload',
      })
      .then();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
