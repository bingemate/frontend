export interface TvShowWatchlistItem {
  tvShowId: number;
  episodes?: EpisodeWatchlistItem[];
  status: TvShowWatchListStatus;
}

export interface EpisodeWatchlistItem {
  episodeId: number;
  tvShowId: number;
  name: string;
  episode: number;
  season: number;
  saved: boolean;
  status: string;
}

export interface CreateEpisodeWatchlistItem {
  tvShowId: number;
  episodeId: number;
  status: TvShowWatchListStatus;
}

export interface CreateTvShowWatchlistItem {
  tvShowId: number;
  status: TvShowWatchListStatus;
}
export interface TvShowWatchlistResponse {
  watchListItems: TvShowWatchlistItem[];
}
export enum TvShowWatchListStatus {
  WATCHING = 'WATCHING',
  FINISHED = 'FINISHED',
  PLAN_TO_WATCH = 'PLAN_TO_WATCH',
  ABANDONED = 'ABANDONED',
}
