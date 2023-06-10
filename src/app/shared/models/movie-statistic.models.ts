import { Statistic } from './statistic.models';

export interface MovieStatisticApiResponse {
  id: string;
  userId: string;
  movieId: number;
  startedAt: string;
  stoppedAt?: string;
}

export function toMovieStatistics(
  statistics: MovieStatisticApiResponse[]
): Statistic[] {
  return statistics.map(toMovieStatistic);
}

export function toMovieStatistic(
  statistic: MovieStatisticApiResponse
): Statistic {
  return {
    id: statistic.id,
    mediaId: statistic.movieId,
    userId: statistic.userId,
    startedAt: new Date(statistic.startedAt),
    stoppedAt: new Date(statistic.stoppedAt || new Date()),
    type: 'movie',
  };
}
