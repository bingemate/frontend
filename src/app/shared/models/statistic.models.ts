export interface Statistic {
  id: string;
  userId: string;
  mediaId: number;
  startedAt: Date;
  stoppedAt: Date;
  type: 'tv-shows' | 'movies';
}
