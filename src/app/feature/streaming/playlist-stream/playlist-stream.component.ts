import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { map, mergeMap, Observable, Subscription, switchMap } from 'rxjs';
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
import { TvEpisodeResponse } from '../../../shared/models/media.models';

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

  tvNames: Map<number, string> = new Map<number, string>();
  episodeNames: Map<number, string> = new Map<number, string>();

  isOnPhone = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private readonly store: Store,
    private mediaService: MediaInfoService
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.breakpointObserver
        .observe([Breakpoints.Handset])
        .subscribe(result => {
          this.isOnPhone = result.matches;
        })
    );
    this.subscriptions.push(
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
        .subscribe()
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
    const moviesIds = items.map(item => item.movieId);
    return this.mediaService.getMoviesShortInfo(moviesIds).pipe(
      map(movies => {
        return movies.map(movie => {
          const playlistItem = items.find(item => item.movieId === movie.id);
          return {
            media: {
              name: movie.title,
              imageUrl: movie.backdropUrl,
            },
            playlistItem: playlistItem!,
          };
        });
      })
    );
  }

  private getEpisodes(
    items: EpisodePlaylistItem[]
  ): Observable<EpisodePlaylistItemMedia[]> {
    /*return forkJoin(
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

    const episodesIds = items.map(item => item.episodeId);
    return this.mediaService.getTvShowEpisodesInfoByIds(episodesIds).pipe(
      map(episodes => {
        this.processTvShowName(episodes);
        return episodes.map(episode => {
          const playlistItem = items.find(
            item => item.episodeId === episode.id
          );
          return {
            media: {
              name: episode.name,
              imageUrl: episode.posterUrl,
              episode: episode.episodeNumber,
              season: episode.seasonNumber,
            },
            playlistItem: playlistItem!,
          };
        });
      })
    );
  }

  processTvShowName(episodes: TvEpisodeResponse[]): void {
    const tvShowIds = new Set<number>();
    episodes.forEach(episode => {
      tvShowIds.add(episode.tvShowId);
    });
    this.subscriptions.push(
      this.mediaService.getTvShowsShortInfo(Array.from(tvShowIds)).subscribe({
        next: tvShows => {
          tvShows.forEach(tvShow => {
            this.tvNames.set(tvShow.id, tvShow.title);
          });
          episodes.forEach(episode => {
            this.episodeNames.set(
              episode.id,
              `${this.tvNames.get(episode.tvShowId)} - ${
                episode.seasonNumber
              }x${episode.episodeNumber.toString().padStart(2, '0')} - ${
                episode.name
              }`
            );
          });
        },
      })
    );
  }

  seekMedia(index: number) {
    this.store.dispatch(new StreamingActions.SeekMediaPlaylist(index));
  }

  onAutoplayToggle($event: boolean) {
    this.store.dispatch(new StreamingActions.AutoplayToggle($event));
  }
}
