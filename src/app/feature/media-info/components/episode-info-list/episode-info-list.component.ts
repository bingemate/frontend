import { Component, Input, OnInit } from '@angular/core';
import { TvEpisodeResponse } from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../media-info.service';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';
import { Select, Store } from '@ngxs/store';
import { PlaylistState } from '../../../playlist/store/playlist.state';
import { Observable } from 'rxjs';
import { Playlist } from '../../../../shared/models/playlist.model';
import { PlaylistActions } from '../../../playlist/store/playlist.actions';
import { PlaylistsService } from '../../../playlist/playlists.service';
import { NotificationsService } from '../../../../core/notifications/notifications.service';

@Component({
  selector: 'app-episode-info-list',
  templateUrl: './episode-info-list.component.html',
  styleUrls: ['./episode-info-list.component.less'],
})
export class EpisodeInfoListComponent implements OnInit {
  readonly streamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;

  @Select(PlaylistState.episodePlaylists)
  playlists$!: Observable<Playlist[]>;
  @Input() tvShowId = 0;
  @Input() seasonNumber = 0;

  loading = false;

  seasonEpisodes: TvEpisodeResponse[] = [];
  selectedEpisode?: TvEpisodeResponse;

  constructor(
    private readonly store: Store,
    private mediaInfoService: MediaInfoService,
    private playlistsService: PlaylistsService,
    private readonly notificationsService: NotificationsService
  ) {}

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
      this.playlistsService
        .addToPlaylist(playlistId, {
          mediaId: this.selectedEpisode.id,
          episode: this.selectedEpisode.episodeNumber,
          season: this.selectedEpisode.seasonNumber,
        })
        .subscribe(() =>
          this.notificationsService.success('Episode ajouté à la playlist')
        );
    }
  }
}
