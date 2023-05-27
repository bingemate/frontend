import { Component, Input } from '@angular/core';
import { MediaResponse } from '../../../../shared/models/media.models';

@Component({
  selector: 'app-media-info',
  templateUrl: './media-info.component.html',
  styleUrls: ['./media-info.component.less'],
})
export class MediaInfoComponent {
  @Input() mediaInfo?: MediaResponse;
}
