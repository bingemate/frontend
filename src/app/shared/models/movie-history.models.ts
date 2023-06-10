import { HistoryModel } from './history.models';

export interface MovieHistoryAPIResponse {
  userId: string;
  movieId: number;
  stoppedAt: number;
  viewedAt: Date;
}

export interface MovieHistoryListAPIResponse {
  medias: MovieHistoryAPIResponse[];
}

export function toMovieHistoryList(
  history: MovieHistoryListAPIResponse
): HistoryModel[] {
  return history.medias.map(toMovieHistory);
}

export function toMovieHistory(history: MovieHistoryAPIResponse): HistoryModel {
  return {
    userId: history.userId,
    mediaId: history.movieId,
    stoppedAt: history.stoppedAt,
    viewedAt: history.viewedAt,
    type: 'movie',
  };
}
