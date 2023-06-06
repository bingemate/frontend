import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { forkJoin, map, mergeMap, Observable, Subscription } from 'rxjs';
import { StreamingState } from '../store/streaming.state';
import {
  Playlist,
  PlaylistItem,
  PlaylistType,
} from '../../../shared/models/playlist.model';
import { StreamingActions } from '../store/streaming.actions';
import { MediaInfoService } from '../../media-info/media-info.service';

@Component({
  selector: 'app-playlist-stream',
  templateUrl: './playlist-stream.component.html',
  styleUrls: ['./playlist-stream.component.less'],
})
export class PlaylistStreamComponent implements OnInit, OnDestroy {
  @Select(StreamingState.playlist)
  playlist$!: Observable<Playlist>;
  @Select(StreamingState.autoplay)
  autoplay$!: Observable<boolean>;
  @Select(StreamingState.position)
  position$!: Observable<number>;
  playlist?: Playlist;
  playlistItems: {
    playlistItem: PlaylistItem;
    media: {
      name: string;
      imageUrl: string;
    };
  }[] = [];
  autoplay?: boolean;
  position?: number;
  subscriptions: Subscription[] = [];

  constructor(
    private readonly store: Store,
    private mediaService: MediaInfoService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.playlist$
        .pipe(
          mergeMap(playlist => {
            this.playlist = playlist;
            return this.playlist.type === PlaylistType.MOVIE
              ? this.getMovies(playlist.items)
              : this.getEpisodes(playlist.items);
          })
        )
        .subscribe(items => (this.playlistItems = items))
    );
    this.subscriptions.push(
      this.autoplay$.subscribe(autoplay => (this.autoplay = autoplay))
    );
    this.subscriptions.push(
      this.position$.subscribe(position => (this.position = position))
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
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

  seekMedia(index: number) {
    this.store.dispatch(new StreamingActions.SeekMediaPlaylist(index));
  }

  onAutoplayToggle($event: boolean) {
    this.store.dispatch(new StreamingActions.AutoplayToggle($event));
  }
}
