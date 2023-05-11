export interface HistoryModel {
  userId: number;
  mediaId: number;
  stoppedAt: number;
}

export interface HistoryStateModel {
  history: HistoryModel[];
}

export interface MediaHistoryAPIResponse {
  userId: number;
  mediaId: number;
  stoppedAt: number;
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
  };
}
