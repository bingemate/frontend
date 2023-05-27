import { Component, Input } from '@angular/core';
import { Actor } from '../../../../shared/models/media.models';

@Component({
  selector: 'app-actor-info',
  templateUrl: './actor-info.component.html',
  styleUrls: ['./actor-info.component.less'],
})
export class ActorInfoComponent {
  @Input() actor: Actor | undefined;
}
