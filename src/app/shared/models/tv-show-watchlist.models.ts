export interface TvShowWatchlistItem {
  tvShowId: number;
  userId: string;
  viewedEpisodes: number;
  status: TvShowWatchListStatus;
}
export interface CreateTvShowWatchlistItem {
  tvShowId: number;
  viewedEpisodes: number;
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
