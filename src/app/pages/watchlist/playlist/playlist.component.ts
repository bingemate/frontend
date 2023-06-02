import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { forkJoin, map, mergeMap } from 'rxjs';
import { Playlist, PlaylistItem, PlaylistType } from '../../../shared/models/playlist.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService } from '../../../feature/playlist/playlists.service';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { StreamingActions } from '../../../feature/streaming/store/streaming.actions';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less'],
})
export class PlaylistComponent implements OnInit {
  playlist?: Playlist;

  playlistItems: {
    playlistItem: PlaylistItem;
    media: {
      name: string;
      imageUrl: string;
    };
  }[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private playlistsService: PlaylistsService,
    private mediaService: MediaInfoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => this.updatePlaylist(params['id']));
  }

  private updatePlaylist(id: string): void {
    this.playlistsService
      .getPlaylistById(id)
      .pipe(
        mergeMap(playlist => {
          this.playlist = playlist;
          return this.playlist.type === PlaylistType.MOVIE
            ? this.getMovies(playlist.items)
            : this.getEpisodes(playlist.items);
        })
      )
      .subscribe(items => (this.playlistItems = items));
  }

  private getMovies(items: PlaylistItem[]) {
    return forkJoin(
      items.map(item =>
        this.mediaService.getMovieInfo(item.mediaId).pipe(
          map(media => {
            return {
              media: {
                name: media.title,
                imageUrl: media.backdropUrl,
              },
              playlistItem: item,
            };
          })
        )
      )
    );
  }

  private getEpisodes(items: PlaylistItem[]) {
    return forkJoin(
      items.map(item =>
        this.mediaService
          .getTvShowEpisodeInfo(item.mediaId, item.season, item.episode)
          .pipe(
            map(media => {
              return {
                media: {
                  name: media.name,
                  imageUrl: media.posterUrl,
                },
                playlistItem: item,
              };
            })
          )
      )
    );
  }

  itemMoved(event: CdkDragDrop<PlaylistItem[]>) {
    if (!this.playlist || !this.playlistItems) {
      return;
    }
    const items = [...this.playlistItems];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.playlistsService
      .updatePlaylistOrder(this.playlist.id, {
        items: this.playlistItems.map(item => item.playlistItem),
      })
      .subscribe(() => (this.playlistItems = items));
  }

  removeItem(deletedItem: PlaylistItem): void {
    if (!this.playlist) {
      return;
    }
    this.playlistsService
      .deletePlaylistMedia(this.playlist.id, deletedItem.mediaId)
      .subscribe(() => {
        this.playlistItems = this.playlistItems.filter(
          item => item.playlistItem.mediaId !== deletedItem.mediaId
        );
      });
  }

  watchMedia(index: number) {
    if (!this.playlist) {
      return;
    }
    this.store.dispatch(
      new StreamingActions.WatchPlaylist(this.playlist, index)
    );
  }
}
