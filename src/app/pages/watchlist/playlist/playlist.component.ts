import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';
import {
  Playlist,
  PlaylistItem,
  PlaylistType,
} from '../../../shared/models/playlist.model';
import { PlaylistsState } from '../../../feature/playlist/store/playlists.state';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService } from '../../../feature/playlist/playlists.service';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less'],
})
export class PlaylistComponent implements OnInit {
  @Select(PlaylistsState.playlists) playlists$!: Observable<Playlist[]>;
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
    this.playlist = this.store
      .selectSnapshot(PlaylistsState.playlists)
      .find(playlist => playlist.id === id);
    if (this.playlist) {
      this.playlist.type === PlaylistType.MOVIE
        ? this.getMovies(this.playlist.id)
        : this.getEpisodes(this.playlist.id);
    }
  }

  private getMovies(id: string) {
    this.playlistsService
      .getPlaylistItems(id)
      .pipe(
        mergeMap(items =>
          forkJoin(
            items.map(item =>
              this.mediaService
                .getTvShowEpisodeInfo(1, item.season, item.episode)
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
          )
        )
      )
      .subscribe(items => (this.playlistItems = items));
  }

  private getEpisodes(id: string) {
    this.playlistsService
      .getPlaylistItems(id)
      .pipe(
        mergeMap(items =>
          forkJoin(
            items.map(item =>
              this.mediaService.getMovieInfo(1).pipe(
                map(media => {
                  return {
                    media: {
                      name: media.title,
                      imageUrl: media.posterUrl,
                    },
                    playlistItem: item,
                  };
                })
              )
            )
          )
        )
      )
      .subscribe(items => (this.playlistItems = items));
  }

  itemMoved(event: CdkDragDrop<PlaylistItem[]>) {
    if (!this.playlist || !this.playlistItems) {
      return;
    }
    const items = [...this.playlistItems];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.playlistsService.updatePlaylistOrder(this.playlist.id, {
      items: this.playlistItems.map(item => item.playlistItem),
    });
  }
}
