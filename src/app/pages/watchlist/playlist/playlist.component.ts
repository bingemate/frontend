import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { forkJoin, map, mergeMap, Observable, switchMap } from 'rxjs';
import {
  EpisodePlaylist,
  EpisodePlaylistItem,
  EpisodePlaylistItemMedia,
} from '../../../shared/models/episode-playlist.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { MoviePlaylistsService } from '../../../feature/playlist/movie-playlists.service';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { AuthState } from '../../../core/auth/store/auth.state';
import { UserResponse } from '../../../shared/models/user.models';
import { StreamingActions } from '../../../feature/streaming/store/streaming.actions';
import {
  MoviePlaylist,
  MoviePlaylistItem,
  MoviePlaylistItemMedia,
} from '../../../shared/models/movie-playlist.model';
import { EpisodePlaylistsService } from '../../../feature/playlist/episode-playlists.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less'],
})
export class PlaylistComponent implements OnInit {
  @Select(AuthState.isSubscribed)
  isSubscribed$!: Observable<boolean>;
  isSubscribed = false;

  episodePlaylist?: EpisodePlaylist;
  moviePlaylist?: MoviePlaylist;
  playlistLoading = false;
  type?: 'movies' | 'episodes';

  @Select(AuthState.user)
  user$!: Observable<UserResponse>;
  user: UserResponse | undefined;

  @Select(AuthState.isAdmin)
  isAdmin$!: Observable<boolean>;
  isAdmin: boolean | undefined;

  moviePlaylistItems: MoviePlaylistItemMedia[] = [];
  episodePlaylistItems: EpisodePlaylistItemMedia[] = [];

  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private moviePlaylistsService: MoviePlaylistsService,
    private episodePlaylistsService: EpisodePlaylistsService,
    private mediaService: MediaInfoService
  ) {
    this.user$.subscribe(user => (this.user = user));
    this.isAdmin$.subscribe(isAdmin => (this.isAdmin = isAdmin));
    this.isSubscribed$.subscribe(
      isSubscribed => (this.isSubscribed = isSubscribed)
    );
  }

  ngOnInit(): void {
    this.watchPlaylistUpdate();
  }

  private watchPlaylistUpdate(): void {
    this.playlistLoading = true;
    this.route.params
      .pipe(
        switchMap(params => {
          const id = params['id'];
          this.type = params['type'];
          if (this.type === 'movies') {
            return this.moviePlaylistsService.getPlaylistById(id).pipe(
              mergeMap(playlist => {
                this.moviePlaylist = playlist;
                return this.getMovies(playlist.items);
              }),
              tap(items => {
                this.playlistLoading = false;
                this.moviePlaylistItems = items;
              })
            );
          } else {
            return this.episodePlaylistsService.getPlaylistById(id).pipe(
              mergeMap(playlist => {
                this.episodePlaylist = playlist;
                return this.getEpisodes(playlist.items);
              }),
              tap(items => {
                this.playlistLoading = false;
                this.episodePlaylistItems = items;
              })
            );
          }
        })
      )
      .subscribe();
  }

  private getMovies(
    items: MoviePlaylistItem[]
  ): Observable<MoviePlaylistItemMedia[]> {
    return forkJoin(
      items.map(item =>
        this.mediaService.getMovieInfo(item.movieId).pipe(
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

  itemMoved(event: CdkDragDrop<(EpisodePlaylistItem | MoviePlaylistItem)[]>) {
    if (this.type === 'movies') {
      this.itemMovieMoved(event as CdkDragDrop<MoviePlaylistItem[]>);
    } else {
      this.itemEpisodeMoved(event as CdkDragDrop<EpisodePlaylistItem[]>);
    }
  }

  itemEpisodeMoved(event: CdkDragDrop<EpisodePlaylistItem[]>) {
    if (!this.episodePlaylist || !this.episodePlaylistItems) {
      return;
    }
    const items = [...this.episodePlaylistItems];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.episodePlaylistsService
      .updatePlaylistOrder(this.episodePlaylist.id, {
        items: this.episodePlaylistItems.map(item => item.playlistItem),
      })
      .subscribe(() => (this.episodePlaylistItems = items));
  }

  itemMovieMoved(event: CdkDragDrop<MoviePlaylistItem[]>) {
    if (!this.moviePlaylist || !this.moviePlaylistItems) {
      return;
    }
    const items = [...this.moviePlaylistItems];
    moveItemInArray(items, event.previousIndex, event.currentIndex);
    this.moviePlaylistsService
      .updatePlaylistOrder(this.moviePlaylist.id, {
        items: this.moviePlaylistItems.map(item => item.playlistItem),
      })
      .subscribe(() => (this.moviePlaylistItems = items));
  }

  watchMedia(index: number) {
    if (!this.isSubscribed) {
      return;
    }
    if (this.type === 'movies' && this.moviePlaylist) {
      this.store.dispatch(
        new StreamingActions.WatchMoviePlaylist(this.moviePlaylist, index)
      );
    } else if (this.type === 'episodes' && this.episodePlaylist) {
      this.store.dispatch(
        new StreamingActions.WatchEpisodePlaylist(this.episodePlaylist, index)
      );
    }
  }

  removeItem(playlistItem: EpisodePlaylistItem | MoviePlaylistItem) {
    if (this.type === 'movies') {
      this.removeMovieItem(playlistItem as MoviePlaylistItem);
    } else {
      this.removeEpisodeItem(playlistItem as EpisodePlaylistItem);
    }
  }

  removeMovieItem(deletedItem: MoviePlaylistItem): void {
    if (!this.moviePlaylist) {
      return;
    }
    this.moviePlaylistsService
      .deletePlaylistMedia(this.moviePlaylist.id, deletedItem.movieId)
      .subscribe(() => {
        this.moviePlaylistItems = (
          this.moviePlaylistItems as MoviePlaylistItemMedia[]
        ).filter(item => item.playlistItem.movieId !== deletedItem.movieId);
      });
  }

  removeEpisodeItem(deletedItem: EpisodePlaylistItem): void {
    if (!this.episodePlaylist) {
      return;
    }
    this.episodePlaylistsService
      .deletePlaylistMedia(this.episodePlaylist.id, deletedItem.episodeId)
      .subscribe(() => {
        this.episodePlaylistItems = (
          this.episodePlaylistItems as EpisodePlaylistItemMedia[]
        ).filter(item => item.playlistItem.episodeId !== deletedItem.episodeId);
      });
  }

  private getEpisodes(
    items: EpisodePlaylistItem[]
  ): Observable<EpisodePlaylistItemMedia[]> {
    return forkJoin(
      items.map(item =>
        this.mediaService.getTvShowEpisodeInfoById(item.episodeId).pipe(
          map(media => {
            return {
              media: {
                name: media.name,
                imageUrl: media.posterUrl,
                episode: media.episodeNumber,
                season: media.seasonNumber,
              },
              playlistItem: item,
            };
          })
        )
      )
    );
  }
}
