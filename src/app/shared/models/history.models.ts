import { MediaType } from './media.models';

export interface HistoryModel {
  userId: string;
  mediaId: string;
  stoppedAt: number;
  viewedAt: Date;
}

export interface MediaHistoryModel {
  mediaId: string;
  mediaTitle: string;
  mediaType: MediaType;
  stoppedAt: number;
  backgroundImage: string;
}

export interface HistoryStateModel {
  history: HistoryModel[];
}

export interface MediaHistoryAPIResponse {
  userId: string;
  mediaId: string;
  stoppedAt: number;
  viewedAt: Date;
}

export interface HistoryAPIResponse {
  medias: MediaHistoryAPIResponse[];
}

export function toHistories(history: HistoryAPIResponse): HistoryModel[] {
  return history.medias.map(toHistory);
}

export function toHistory(history: MediaHistoryAPIResponse): HistoryModel {
  return {
    userId: history.userId,
    mediaId: history.mediaId,
    stoppedAt: history.stoppedAt,
    viewedAt: history.viewedAt,
  };
}
