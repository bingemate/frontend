import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TvEpisodeResponse } from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../media-info.service';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';
import { Select, Store } from '@ngxs/store';
import { PlaylistState } from '../../../playlist/store/playlist.state';
import { Observable, Subscription } from 'rxjs';
import { PlaylistActions } from '../../../playlist/store/playlist.actions';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { EpisodePlaylist } from '../../../../shared/models/episode-playlist.model';
import { EpisodePlaylistsService } from '../../../playlist/episode-playlists.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { WatchTogetherService } from '../../../watch-together/watch-together.service';
import { FriendshipService } from '../../../friendship/friendship.service';
import { subscriptionLinks } from '../../../../pages/subscription/subscriptions-routing.module';
import { HistoryModel } from '../../../../shared/models/history.models';
import { EpisodeHistoryService } from '../../../history/episode-history.service';
import { TvShowWatchlistService } from '../../../watchlist/tv-show-watchlist.service';
import { TvShowWatchListStatus } from '../../../../shared/models/tv-show-watchlist.models';

@Component({
  selector: 'app-episode-info-list',
  templateUrl: './episode-info-list.component.html',
  styleUrls: ['./episode-info-list.component.less'],
})
export class EpisodeInfoListComponent implements OnInit, OnDestroy {
  @Select(AuthState.isSubscribed)
  isSubscribed$!: Observable<boolean>;

  readonly streamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/tv-shows/`;
  readonly subscriptionPath = `/${navigationRoot.subscriptions.path}/${subscriptionLinks.subscriptions.path}/`;

  @Select(PlaylistState.episodePlaylists)
  playlists$!: Observable<EpisodePlaylist[]>;
  @Input() tvShowId = 0;
  @Input() seasonNumber = 0;
  isOnPhone = false;

  loading = false;

  seasonEpisodes: TvEpisodeResponse[] = [];
  seasonEpisodesHistory: Map<number, HistoryModel> = new Map();
  selectedEpisodes: TvEpisodeResponse[] = [];
  showWatchTogether = false;
  selectedFriends: string[] = [];
  friends: string[] = [];
  private watchTogetherEpisodeId = 0;

  subscriptions: Subscription[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly store: Store,
    private mediaInfoService: MediaInfoService,
    private episodePlaylistsService: EpisodePlaylistsService,
    private readonly notificationsService: NotificationsService,
    private friendshipService: FriendshipService,
    private readonly watchTogetherService: WatchTogetherService,
    private readonly episodeHistoryService: EpisodeHistoryService,
    private readonly tvShowWatchlistService: TvShowWatchlistService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.HandsetPortrait])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.loading = true;
    this.store.dispatch(new PlaylistActions.GetCurrentUserPlaylists());
    this.onGetSeasonEpisodes();
    this.subscriptions.push(
      this.friendshipService
        .getFriendships()
        .subscribe(
          friends => (this.friends = friends.map(friend => friend.friendId))
        )
    );
  }

  private onGetSeasonEpisodes() {
    this.subscriptions.push(
      this.mediaInfoService
        .getTvShowSeasonEpisodesInfo(this.tvShowId, this.seasonNumber)
        .subscribe({
          next: episodes => {
            this.seasonEpisodes = episodes;
            this.onGetSeasonEpisodesHistory();
          },
          complete: () => {
            this.loading = false;
          },
        })
    );
  }

  private onGetSeasonEpisodesHistory() {
    const episodeIds = this.seasonEpisodes.map(episode => episode.id);
    this.subscriptions.push(
      this.episodeHistoryService.getEpisodesHistoryList(episodeIds).subscribe({
        next: historyList => {
          if (historyList) {
            historyList.forEach(history => {
              this.seasonEpisodesHistory.set(history.mediaId, history);
            });
          }
        },
      })
    );
  }

  onEpisodeSelection(episode: TvEpisodeResponse) {
    if (this.selectedEpisodes.includes(episode)) {
      this.selectedEpisodes = this.selectedEpisodes.filter(
        selected => selected !== episode
      );
      return;
    }
    this.selectedEpisodes.push(episode);
  }

  addToPlaylist(playlistId: string) {
    if (this.selectedEpisodes.length > 0) {
      this.subscriptions.push(
        this.episodePlaylistsService
          .addToPlaylist(
            playlistId,
            this.selectedEpisodes.map(episode => ({
              episodeId: episode.id,
            }))
          )
          .subscribe(() =>
            this.notificationsService.success('Episode ajouté à la playlist')
          )
      );
    }
  }

  watchTogetherModal(episodeId: number) {
    this.watchTogetherEpisodeId = episodeId;
    this.showWatchTogether = true;
  }

  cancelCreation() {
    this.showWatchTogether = false;
    this.selectedFriends = [];
    this.watchTogetherEpisodeId = 0;
  }

  createRoom() {
    if (this.tvShowId) {
      this.subscriptions.push(
        this.mediaInfoService
          .getAvailableEpisodes(this.tvShowId)
          .subscribe(episodes =>
            this.watchTogetherService.createRoom({
              invitedUsers: this.selectedFriends,
              mediaIds: episodes,
              mediaType: 'tv-shows',
              playlistPosition: episodes.indexOf(this.watchTogetherEpisodeId),
            })
          )
      );
    }
  }

  setEpisodeHistory(episode: TvEpisodeResponse, stoppedAt: number) {
    if (stoppedAt === 1) {
      this.changeEpisodeWatchlistStatus(
        episode,
        TvShowWatchListStatus.FINISHED
      );
    }
    const history = this.seasonEpisodesHistory.get(episode.id);
    if (history) {
      this.subscriptions.push(
        this.episodeHistoryService
          .updateEpisodeHistory(episode.id, stoppedAt)
          .subscribe({
            next: () => {
              this.notificationsService.success('Progression sauvegardée');
              this.seasonEpisodesHistory.set(episode.id, {
                ...history,
                stoppedAt,
              });
            },
          })
      );
    } else {
      this.subscriptions.push(
        this.episodeHistoryService
          .createEpisodeHistory(episode.id, stoppedAt)
          .subscribe({
            next: () => {
              this.notificationsService.success('Progression sauvegardée');
              this.seasonEpisodesHistory.set(episode.id, {
                stoppedAt,
                mediaId: episode.id,
                userId: '',
                viewedAt: new Date(),
                type: 'tv-shows',
              });
            },
          })
      );
    }
  }

  deleteEpisodeHistory(episodeId: number) {
    this.subscriptions.push(
      this.episodeHistoryService.deleteEpisodeHistory(episodeId).subscribe({
        next: () => {
          this.notificationsService.success('Progression supprimée');
          this.seasonEpisodesHistory.delete(episodeId);
        },
      })
    );
  }

  changeEpisodeWatchlistStatus(
    episode: TvEpisodeResponse,
    status: TvShowWatchListStatus
  ) {
    this.subscriptions.push(
      this.tvShowWatchlistService
        .createEpisodeWatchlistItem({
          episodeId: episode.id,
          status,
          tvShowId: this.tvShowId,
        })
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
