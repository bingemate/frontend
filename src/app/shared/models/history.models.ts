export interface HistoryModel {
  userId: string;
  mediaId: number;
  stoppedAt: number;
  viewedAt: Date;
  type: 'episode' | 'movie';
}
