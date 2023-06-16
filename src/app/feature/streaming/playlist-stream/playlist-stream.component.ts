import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
  forkJoin,
  map,
  mergeMap,
  Observable,
  Subscription,
  switchMap,
} from 'rxjs';
import { MediaInfoService } from '../../media-info/media-info.service';
import {
  MoviePlaylist,
  MoviePlaylistItem,
  MoviePlaylistItemMedia,
} from '../../../shared/models/movie-playlist.model';
import {
  EpisodePlaylist,
  EpisodePlaylistItem,
  EpisodePlaylistItemMedia,
} from '../../../shared/models/episode-playlist.model';
import { StreamingState } from '../store/streaming.state';
import { StreamingActions } from '../store/streaming.actions';
import { tap } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-playlist-stream',
  templateUrl: './playlist-stream.component.html',
  styleUrls: ['./playlist-stream.component.less'],
})
export class PlaylistStreamComponent implements OnInit, OnDestroy {
  @Select(StreamingState.moviePlaylist)
  moviePlaylist$!: Observable<MoviePlaylist>;
  @Select(StreamingState.episodePlaylist)
  episodePlaylist$!: Observable<EpisodePlaylist>;
  @Select(StreamingState.type)
  type$!: Observable<'movies' | 'tv-shows' | undefined>;
  @Select(StreamingState.autoplay)
  autoplay$!: Observable<boolean>;
  @Select(StreamingState.position)
  position$!: Observable<number>;
  playlist?: EpisodePlaylist;
  episodePlaylistItems: EpisodePlaylistItemMedia[] = [];
  moviePlaylistItems: MoviePlaylistItemMedia[] = [];
  autoplay?: boolean;
  position?: number;
  subscriptions: Subscription[] = [];

  isOnPhone = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly store: Store,
    private mediaService: MediaInfoService
  ) {
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isOnPhone = result.matches;
    });
  }

  ngOnInit(): void {
    this.type$
      .pipe(
        switchMap(type => {
          if (type === 'movies') {
            return this.moviePlaylist$.pipe(
              mergeMap(playlist => {
                return this.getMovies(playlist.items);
              }),
              tap(items => {
                this.moviePlaylistItems = items;
              })
            );
          } else {
            return this.episodePlaylist$.pipe(
              mergeMap(playlist => {
                return this.getEpisodes(playlist.items);
              }),
              tap(items => {
                this.episodePlaylistItems = items;
              })
            );
          }
        })
      )
      .subscribe();
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

  seekMedia(index: number) {
    this.store.dispatch(new StreamingActions.SeekMediaPlaylist(index));
  }

  onAutoplayToggle($event: boolean) {
    this.store.dispatch(new StreamingActions.AutoplayToggle($event));
  }
}
