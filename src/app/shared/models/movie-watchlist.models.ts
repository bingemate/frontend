export interface MovieWatchlistItem {
  movieId: number;
  userId: string;
  status: MovieWatchListStatus;
}
export interface CreateMovieWatchlistItem {
  movieId: number;
  status: MovieWatchListStatus;
}
export interface MovieWatchlistResponse {
  watchListItems: MovieWatchlistItem[];
}
export enum MovieWatchListStatus {
  WATCHING = 'WATCHING',
  FINISHED = 'FINISHED',
  PLAN_TO_WATCH = 'PLAN_TO_WATCH',
  ABANDONED = 'ABANDONED',
}
