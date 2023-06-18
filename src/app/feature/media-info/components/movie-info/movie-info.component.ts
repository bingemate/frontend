import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MovieResponse, Person } from '../../../../shared/models/media.models';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';
import { mediasLinks } from '../../../../pages/medias/medias-routing.module';
import { Select, Store } from '@ngxs/store';
import { filter, Observable, switchMap } from 'rxjs';
import { PlaylistState } from '../../../playlist/store/playlist.state';
import { PlaylistActions } from '../../../playlist/store/playlist.actions';
import { MoviePlaylistsService } from '../../../playlist/movie-playlists.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { UserResponse } from '../../../../shared/models/user.models';
import { MoviePlaylist } from '../../../../shared/models/movie-playlist.model';
import {
  MovieWatchlistItem,
  MovieWatchListStatus,
} from '../../../../shared/models/movie-watchlist.models';
import { MovieWatchlistService } from '../../../watchlist/movie-watchlist.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FriendshipService } from '../../../friendship/friendship.service';
import { WatchTogetherService } from '../../../watch-together/watch-together.service';
import { subscriptionLinks } from '../../../../pages/subscription/subscriptions-routing.module';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.less'],
})
export class MovieInfoComponent implements OnInit, OnChanges {
  @Select(AuthState.isSubscribed)
  isSubscribed$!: Observable<boolean>;

  @Select(AuthState.user)
  readonly user$!: Observable<UserResponse>;
  userId = '';

  isOnPhone = false;

  readonly streamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/movies/`;
  readonly moviesByGenrePath = `/${navigationRoot.medias.path}/${mediasLinks.movies_by_genre.path}/`;
  readonly moviesByActorPath = `/${navigationRoot.medias.path}/${mediasLinks.movies_by_actor.path}/`;
  readonly moviesByStudioPath = `/${navigationRoot.medias.path}/${mediasLinks.movies_by_studio.path}/`;
  readonly subscriptionPath = `/${navigationRoot.subscriptions.path}/${subscriptionLinks.subscriptions.path}/`;
  readonly statusNames = Object.values(MovieWatchListStatus);

  @Select(PlaylistState.moviePlaylists)
  playlists$!: Observable<MoviePlaylist[]>;
  @Input() movie: MovieResponse | undefined;
  actorsCurrentPage = 1;
  actorsPageSize = 5;
  isMediaInWatchList = false;
  watchlistItem: MovieWatchlistItem | undefined;
  showWatchTogether = false;
  selectedFriends: string[] = [];
  friends: string[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly store: Store,
    private moviePlaylistsService: MoviePlaylistsService,
    private readonly notificationsService: NotificationsService,
    private watchlistService: MovieWatchlistService,
    private friendshipService: FriendshipService,
    private watchTogetherService: WatchTogetherService
  ) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isOnPhone = result.matches;
      });
    this.user$.subscribe(user => {
      this.userId = user?.id;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new PlaylistActions.GetCurrentUserPlaylists());
    this.user$
      .pipe(
        filter(user => user !== null && user !== undefined),
        switchMap(user => this.friendshipService.getUserFriends(user.id))
      )
      .subscribe(
        friends => (this.friends = friends.map(friend => friend.friendId))
      );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['movie'].currentValue &&
      changes['movie'].currentValue !== changes['movie'].previousValue &&
      this.movie
    ) {
      this.watchlistService.getWatchlistItem(this.movie.id).subscribe(item => {
        if (!item) {
          this.isMediaInWatchList = false;
        } else {
          this.isMediaInWatchList = true;
          this.watchlistItem = item;
        }
      });
    }
  }

  getRate(): number {
    return Math.round(this.movie?.voteAverage ?? 0) / 2;
  }

  getActorsSlice(): Person[] {
    const start = (this.actorsCurrentPage - 1) * this.actorsPageSize;
    const end = start + this.actorsPageSize;
    return this.movie?.actors.slice(start, end) ?? [];
  }

  onActorsPageChange(page: number): void {
    this.actorsCurrentPage = page;
  }

  addToPlaylist(playlistId: string) {
    if (this.movie) {
      this.moviePlaylistsService
        .addToPlaylist(playlistId, {
          movieId: this.movie.id,
        })
        .subscribe(() =>
          this.notificationsService.success('Film ajouté à la playlist')
        );
    }
  }

  addToWatchlist(status: MovieWatchListStatus) {
    if (this.movie) {
      this.watchlistService
        .createWatchlistItem({
          status,
          movieId: this.movie.id,
        })
        .subscribe(() => {
          this.notificationsService.success(
            'Le film a été ajouté aux films suivis'
          );
          this.isMediaInWatchList = true;
          this.watchlistItem = {
            movieId: this.movie!.id,
            status,
            userId: this.userId,
          };
        });
    }
  }

  changeMovieStatus(status: MovieWatchListStatus) {
    this.watchlistItem!.status = status;
    this.watchlistService
      .updateWatchlistItem(this.watchlistItem!)
      .subscribe(() =>
        this.notificationsService.success('Liste de suivie modifié')
      );
  }

  removeMovieWatchlist() {
    this.watchlistService
      .removeFromWatchlist(this.watchlistItem!.movieId)
      .subscribe(() => {
        this.isMediaInWatchList = false;
        this.watchlistItem = undefined;
        this.notificationsService.success(
          'Le film a été retiré des films suivis'
        );
      });
  }

  watchTogetherModal() {
    this.showWatchTogether = true;
  }

  cancelCreation() {
    this.showWatchTogether = false;
    this.selectedFriends = [];
  }

  createRoom() {
    if (this.movie) {
      this.watchTogetherService.createRoom({
        invitedUsers: this.selectedFriends,
        mediaIds: [this.movie.id],
        mediaType: 'movies',
        playlistPosition: 0,
      });
    }
  }
}
