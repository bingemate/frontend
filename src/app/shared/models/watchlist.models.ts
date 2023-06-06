export interface WatchlistItem {
  mediaId: number;
  userId: string;
  viewedEpisodes?: number;
  status: WatchListStatus;
  mediaType: WatchListType;
}
export interface CreateWatchlistItem {
  mediaId: number;
  viewedEpisodes?: number;
  status: WatchListStatus;
  mediaType: WatchListType;
}
export interface WatchlistResponse {
  watchListItems: WatchlistItem[];
}
export enum WatchListType {
  MOVIE = 'MOVIE',
  SHOW = 'SHOW',
}
export enum WatchListStatus {
  WATCHING = 'WATCHING',
  FINISHED = 'FINISHED',
  PLAN_TO_WATCH = 'PLAN_TO_WATCH',
  ABANDONED = 'ABANDONED',
}
