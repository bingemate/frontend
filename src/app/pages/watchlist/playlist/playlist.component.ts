import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { mergeMap, Observable } from 'rxjs';
import { Playlist, PlaylistItem } from '../../../shared/models/playlist.model';
import { PlaylistsState } from '../../../feature/playlist/store/playlists.state';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsActions } from '../../../feature/playlist/store/playlists.actions';
import GetPlaylistItems = PlaylistsActions.GetPlaylistItems;
import { AuthState } from '../../../core/auth/store/auth.state';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less'],
})
export class PlaylistComponent implements OnInit {
  @Select(PlaylistsState.playlists) playlists$!: Observable<Playlist[]>;
  playlist?: Playlist;
  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    this.route.params.subscribe(params =>
      this.store.dispatch(new GetPlaylistItems(params['id'])).subscribe(() => {
        this.playlist = this.store
          .selectSnapshot(PlaylistsState.playlists)
          .find(playlist => playlist.id === params['id']);
      })
    );
  }

  itemMoved(event: CdkDragDrop<PlaylistItem[]>) {
    moveItemInArray(
      this.playlist!.items!,
      event.previousIndex,
      event.currentIndex
    );
  }
}
