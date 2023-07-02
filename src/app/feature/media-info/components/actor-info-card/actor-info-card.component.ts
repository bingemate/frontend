import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../../../shared/models/media.models';
import { Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { mediaByActorPath } from '../../../../pages/medias/medias-routing.module';

@Component({
  selector: 'app-actor-info-card',
  templateUrl: './actor-info-card.component.html',
  styleUrls: ['./actor-info-card.component.less'],
})
export class ActorInfoCardComponent implements OnInit, OnDestroy {
  @Input() actor?: Actor;
  isOnPhone = false;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.Handset])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
  }

  onViewActor(): void {
    this.router
      .navigate([mediaByActorPath, this.actor?.id], {
        onSameUrlNavigation: 'reload',
      })
      .then();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
