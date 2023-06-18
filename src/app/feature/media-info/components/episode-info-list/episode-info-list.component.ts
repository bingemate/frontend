import { Component, Input, OnInit } from '@angular/core';
import { TvEpisodeResponse } from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../media-info.service';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';
import { Select, Store } from '@ngxs/store';
import { PlaylistState } from '../../../playlist/store/playlist.state';
import { Observable } from 'rxjs';
import { PlaylistActions } from '../../../playlist/store/playlist.actions';
import { NotificationsService } from '../../../../core/notifications/notifications.service';
import { AuthState } from '../../../../core/auth/store/auth.state';
import { EpisodePlaylist } from '../../../../shared/models/episode-playlist.model';
import { EpisodePlaylistsService } from '../../../playlist/episode-playlists.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { WatchTogetherService } from '../../../watch-together/watch-together.service';
import { FriendshipService } from '../../../friendship/friendship.service';
import { subscriptionLinks } from '../../../../pages/subscription/subscriptions-routing.module';

@Component({
  selector: 'app-episode-info-list',
  templateUrl: './episode-info-list.component.html',
  styleUrls: ['./episode-info-list.component.less'],
})
export class EpisodeInfoListComponent implements OnInit {
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
  selectedEpisode?: TvEpisodeResponse;
  showWatchTogether = false;
  selectedFriends: string[] = [];
  friends: string[] = [];

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly store: Store,
    private mediaInfoService: MediaInfoService,
    private episodePlaylistsService: EpisodePlaylistsService,
    private readonly notificationsService: NotificationsService,
    private friendshipService: FriendshipService,
    private readonly watchTogetherService: WatchTogetherService
  ) {
    this.breakpointObserver
      .observe([Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isOnPhone = result.matches;
      });
  }

  ngOnInit(): void {
    this.loading = true;
    this.store.dispatch(new PlaylistActions.GetCurrentUserPlaylists());
    this.mediaInfoService
      .getTvShowSeasonEpisodesInfo(this.tvShowId, this.seasonNumber)
      .subscribe({
        next: episodes => {
          this.seasonEpisodes = episodes;
        },
        complete: () => {
          this.loading = false;
        },
      });
    this.friendshipService
      .getFriendships()
      .subscribe(
        friends => (this.friends = friends.map(friend => friend.friendId))
      );
  }

  onEpisodeSelection(episode: TvEpisodeResponse) {
    if (this.selectedEpisode === episode) {
      this.selectedEpisode = undefined;
      return;
    }
    this.selectedEpisode = episode;
  }

  addToPlaylist(playlistId: string) {
    if (this.selectedEpisode) {
      this.episodePlaylistsService
        .addToPlaylist(playlistId, {
          episodeId: this.selectedEpisode.id,
        })
        .subscribe(() =>
          this.notificationsService.success('Episode ajouté à la playlist')
        );
    }
  }

  watchTogetherModal() {
    this.showWatchTogether = true;
  }

  cancelCreation() {
    this.showWatchTogether = false;
    this.selectedFriends = [];
  }

  createRoom() {
    if (this.tvShowId) {
      this.mediaInfoService
        .getAvailableEpisodes(this.tvShowId)
        .subscribe(episodes =>
          this.watchTogetherService.createRoom({
            invitedUsers: this.selectedFriends,
            mediaIds: episodes,
            mediaType: 'tv-shows',
            playlistPosition: 0,
          })
        );
    }
  }
}
