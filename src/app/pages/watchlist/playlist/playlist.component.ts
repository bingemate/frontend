import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, mergeMap, Observable, switchMap } from 'rxjs';
import {
  EpisodePlaylist,
  EpisodePlaylistItem,
  EpisodePlaylistItemMedia,
} from '../../../shared/models/episode-playlist.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviePlaylistsService } from '../../../feature/playlist/movie-playlists.service';
import { MediaInfoService } from '../../../feature/media-info/media-info.service';
import { AuthState } from '../../../core/auth/store/auth.state';
import { UserResponse } from '../../../shared/models/user.models';
import { StreamingActions } from '../../../feature/streaming/store/streaming.actions';
import { MoviePlaylist, MoviePlaylistItem, MoviePlaylistItemMedia } from '../../../shared/models/movie-playlist.model';
import { EpisodePlaylistsService } from '../../../feature/playlist/episode-playlists.service';
import { tap } from 'rxjs/operators';
import { NotificationsService } from '../../../core/notifications/notifications.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.less'],
})
export class PlaylistComponent implements OnInit, OnDestroy {
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

  query = '';
  filter = '';
  queryTimeout = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private moviePlaylistsService: MoviePlaylistsService,
    private episodePlaylistsService: EpisodePlaylistsService,
    private mediaService: MediaInfoService,
    private readonly notificationsService: NotificationsService
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

  ngOnDestroy(): void {
    clearTimeout(this.queryTimeout);
  }

  onQuery() {
    clearTimeout(this.queryTimeout);
    this.queryTimeout = setTimeout(() => {
      this.filter = this.query;
    }, 300);
  }

  filteredMovieItems(): MoviePlaylistItemMedia[] {
    return this.moviePlaylistItems.filter(item =>
      item.media.name.toLowerCase().includes(this.filter.toLowerCase())
    );
  }

  filteredEpisodeItems(): EpisodePlaylistItemMedia[] {
    return this.episodePlaylistItems.filter(item =>
      item.media.name.toLowerCase().includes(this.filter.toLowerCase())
    );
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
                this.episodePlaylistItems = items;
              })
            );
          }
        })
      )
      .subscribe({
        next: () => {
          this.playlistLoading = false;
        },
        error: err => {
          this.playlistLoading = false;
          this.notificationsService.error(
            'Erreur lors de la récupération de la playlist',
            err.error.message
          );
        },
      });
  }

  private getMovies(
    items: MoviePlaylistItem[]
  ): Observable<MoviePlaylistItemMedia[]> {
    /*return forkJoin(
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
    );*/
    const movieIds = items.map(item => item.movieId);
    return this.mediaService.getMoviesShortInfo(movieIds).pipe(
      map(movies => {
        return movies.map(movie => {
          const item = items.find(i => i.movieId === movie.id);
          return {
            media: {
              name: movie.title,
              imageUrl: movie.backdropUrl,
            },
            playlistItem: item!,
          };
        });
      })
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
      .subscribe({
        complete: () => {
          this.notificationsService.success('Playlist mise à jour', '');
          this.episodePlaylistItems = items;
        },
        error: err => {
          this.notificationsService.error(
            'Erreur lors de la mise à jour de la playlist',
            err.error.message
          );
        },
      });
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
      .subscribe({
        complete: () => {
          this.notificationsService.success('Playlist mise à jour', '');
          this.moviePlaylistItems = items;
        },
        error: err => {
          this.notificationsService.error(
            'Erreur lors de la mise à jour de la playlist',
            err.error.message
          );
        },
      });
  }

  watchMedia(index: number) {
    if (!this.isSubscribed) {
      return;
    }
    if (this.type === 'movies' && this.moviePlaylist) {
      this.store.dispatch(
        new StreamingActions.WatchMoviePlaylist(this.moviePlaylist, index)
      );
      this.router
        .navigate([
          '/streaming/stream',
          'movies',
          this.moviePlaylist.items[index].movieId,
        ])
        .then();
    } else if (this.type === 'episodes' && this.episodePlaylist) {
      this.store.dispatch(
        new StreamingActions.WatchEpisodePlaylist(this.episodePlaylist, index)
      );
      this.router
        .navigate([
          '/streaming/stream',
          'tv-shows',
          this.episodePlaylist?.items[index].episodeId,
        ])
        .then();
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
      .subscribe({
        complete: () => {
          this.notificationsService.success('Élément supprimé');
          this.moviePlaylistItems = this.moviePlaylistItems.filter(
            item => item.playlistItem.movieId !== deletedItem.movieId
          );
        },
        error: err => {
          this.notificationsService.error(
            "Erreur lors de la suppression de l'élément",
            err.error.message
          );
        },
      });
  }

  removeEpisodeItem(deletedItem: EpisodePlaylistItem): void {
    if (!this.episodePlaylist) {
      return;
    }
    this.episodePlaylistsService
      .deletePlaylistMedia(this.episodePlaylist.id, deletedItem.episodeId)
      .subscribe({
        complete: () => {
          this.notificationsService.success('Élément supprimé');
          this.episodePlaylistItems = this.episodePlaylistItems.filter(
            item => item.playlistItem.episodeId !== deletedItem.episodeId
          );
        },
        error: err => {
          this.notificationsService.error(
            "Erreur lors de la suppression de l'élément",
            err.error.message
          );
        },
      });
  }

  private getEpisodes(
    items: EpisodePlaylistItem[]
  ): Observable<EpisodePlaylistItemMedia[]> {
    /*    return forkJoin(
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
    );*/
    const episodeIds = items.map(item => item.episodeId);
    return this.mediaService.getTvShowEpisodesInfoByIds(episodeIds).pipe(
      map(episodes => {
        return episodes.map(episode => {
          const item = items.find(i => i.episodeId === episode.id);
          return {
            media: {
              name: episode.name,
              imageUrl: episode.posterUrl,
              episode: episode.episodeNumber,
              season: episode.seasonNumber,
            },
            playlistItem: item!,
          };
        });
      })
    );
  }
}
