import { HistoryModel } from './history.models';

export interface EpisodeHistoryAPIResponse {
  userId: string;
  episodeId: number;
  stoppedAt: number;
  viewedAt: Date;
}

export interface EpisodeHistoryListAPIResponse {
  medias: EpisodeHistoryAPIResponse[];
}

export function toEpisodeHistoryList(
  history: EpisodeHistoryListAPIResponse
): HistoryModel[] {
  return history.medias.map(toEpisodeHistory);
}

export function toEpisodeHistory(
  history: EpisodeHistoryAPIResponse
): HistoryModel {
  return {
    userId: history.userId,
    mediaId: history.episodeId,
    stoppedAt: history.stoppedAt,
    viewedAt: new Date(history.viewedAt),
    type: 'episode',
  };
}
