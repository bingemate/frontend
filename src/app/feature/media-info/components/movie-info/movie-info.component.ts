import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MovieResponse, Person } from '../../../../shared/models/media.models';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';
import { mediasLinks } from '../../../../pages/medias/medias-routing.module';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
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
import { MovieHistoryService } from '../../../history/movie-history.service';
import { HistoryModel } from '../../../../shared/models/history.models';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.less'],
})
export class MovieInfoComponent implements OnInit, OnChanges, OnDestroy {
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

  movieHistory: HistoryModel | null = null;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly store: Store,
    private moviePlaylistsService: MoviePlaylistsService,
    private readonly notificationsService: NotificationsService,
    private watchlistService: MovieWatchlistService,
    private readonly movieHistoryService: MovieHistoryService,
    private friendshipService: FriendshipService,
    private watchTogetherService: WatchTogetherService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.subscriptions.push(
      this.user$.subscribe(user => {
        this.userId = user?.id;
      })
    );
    this.store.dispatch(new PlaylistActions.GetCurrentUserPlaylists());
    this.subscriptions.push(
      this.friendshipService
        .getFriendships()
        .subscribe(
          friends => (this.friends = friends.map(friend => friend.friendId))
        )
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['movie'].currentValue &&
      changes['movie'].currentValue !== changes['movie'].previousValue &&
      this.movie
    ) {
      this.subscriptions.push(
        this.watchlistService
          .getWatchlistItem(this.movie.id)
          .subscribe(item => {
            if (!item) {
              this.isMediaInWatchList = false;
            } else {
              this.isMediaInWatchList = true;
              this.watchlistItem = item;
            }
          })
      );
      this.getMovieHistory();
    }
  }

  getMovieHistory() {
    this.subscriptions.push(
      this.movieHistoryService
        .getMovieHistoryById(this.movie?.id ?? 0)
        .subscribe({
          next: movieHistory => {
            this.movieHistory = movieHistory;
          },
        })
    );
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
      this.subscriptions.push(
        this.moviePlaylistsService
          .addToPlaylist(playlistId, {
            movieId: this.movie.id,
          })
          .subscribe(() =>
            this.notificationsService.success('Film ajouté à la playlist')
          )
      );
    }
  }

  addToWatchlist(status: MovieWatchListStatus) {
    if (this.movie) {
      this.subscriptions.push(
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
            if (status == MovieWatchListStatus.FINISHED) {
              this.movieHistory = {
                userId: this.userId,
                type: 'movies',
                mediaId: this.movie!.id,
                stoppedAt: 1,
                viewedAt: new Date(),
              };
            }
          })
      );
    }
  }

  changeMovieStatus(status: MovieWatchListStatus) {
    this.watchlistItem!.status = status;
    this.subscriptions.push(
      this.watchlistService
        .updateWatchlistItem(this.watchlistItem!)
        .subscribe(() => {
          this.notificationsService.success('Liste de suivie modifié');
          if (
            status == MovieWatchListStatus.FINISHED &&
            this.movieHistory !== null
          ) {
            this.movieHistory = {
              userId: this.userId,
              type: 'movies',
              mediaId: this.movie!.id,
              stoppedAt: 1,
              viewedAt: new Date(),
            };
          }
        })
    );
  }

  removeMovieWatchlist() {
    this.subscriptions.push(
      this.watchlistService
        .removeFromWatchlist(this.watchlistItem!.movieId)
        .subscribe(() => {
          this.isMediaInWatchList = false;
          this.watchlistItem = undefined;
          this.movieHistory = null;
          this.notificationsService.success(
            'Le film a été retiré des films suivis'
          );
        })
    );
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  protected readonly history = history;
}
