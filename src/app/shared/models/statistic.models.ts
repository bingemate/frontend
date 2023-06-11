export interface Statistic {
  id: string;
  userId: string;
  mediaId: number;
  startedAt: Date;
  stoppedAt: Date;
  type: 'tv-shows' | 'movies';
}

export interface StatDisplay {
  data: number[];
  labels: string[];
}

export const STAT_COLORS = {
  MOVIE_COLOR: {
    backgroundColor: 'rgba(255, 113, 24, 0.3)',
    borderColor: 'rgb(255, 113, 24)',
    pointBackgroundColor: 'rgb(255, 113, 24)',
  },
  TV_SHOW_COLOR: {
    backgroundColor: 'rgba(47,255,24, 0.3)',
    borderColor: 'rgb(47,255,24)',
    pointBackgroundColor: 'rgb(47,255,24)',
  },
};
