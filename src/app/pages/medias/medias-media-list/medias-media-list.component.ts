import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medias-media-list',
  templateUrl: './medias-media-list.component.html',
  styleUrls: ['./medias-media-list.component.less'],
})
export class MediasMediaListComponent {
  currentRoute = '';

  constructor(router: Router) {
    this.currentRoute = router.url;
  }
}
