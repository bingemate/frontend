import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Playlist, PlaylistItem } from '../../../shared/models/playlist.model';
import { PlaylistsState } from '../../../feature/playlist/store/playlists.state';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less'],
})
export class PlaylistComponent implements OnInit {
  @Select(PlaylistsState.playlists) playlists$!: Observable<Playlist[]>;
  playlists: Playlist[] = [
    {
      name: 'Test',
      userId: 'id',
      id: 'id',
    },
  ];
  playlistItems: PlaylistItem[] = [
    {
      mediaId: 'id1',
    },
    {
      mediaId: 'id',
    },
    {
      mediaId: 'id2',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  itemMoved(event: CdkDragDrop<PlaylistItem[]>) {
    moveItemInArray(
      this.playlistItems,
      event.previousIndex,
      event.currentIndex
    );
  }
}
