import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Actor } from '../../../../shared/models/media.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-actor-info',
  templateUrl: './actor-info.component.html',
  styleUrls: ['./actor-info.component.less'],
})
export class ActorInfoComponent implements OnInit, OnDestroy {
  @Input() actor: Actor | undefined;

  isOnPhone = false;

  subscriptions: Subscription[] = [];
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.Handset])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
