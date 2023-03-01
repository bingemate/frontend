import { Component, Input } from '@angular/core';
import { AlbumModel } from '../../models/album.models';

@Component({
  selector: 'app-album-view',
  templateUrl: './album-view.component.html',
  styleUrls: ['./album-view.component.less'],
})
export class AlbumViewComponent {
  @Input() album!: AlbumModel;
  selectedTabIndex = 0;
}
