import { Component, Input } from '@angular/core';
import { Actor } from '../../../../shared/models/media.models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-actor-info',
  templateUrl: './actor-info.component.html',
  styleUrls: ['./actor-info.component.less'],
})
export class ActorInfoComponent {
  @Input() actor: Actor | undefined;

  isOnPhone = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
  }
}
