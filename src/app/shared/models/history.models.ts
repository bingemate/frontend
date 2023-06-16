export interface HistoryModel {
  userId: string;
  mediaId: number;
  stoppedAt: number;
  viewedAt: Date;
  type: 'tv-shows' | 'movies';
}
