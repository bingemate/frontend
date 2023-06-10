import { Statistic } from './statistic.models';

export interface EpisodeStatisticApiResponse {
  id: string;
  userId: string;
  episodeId: number;
  startedAt: string;
  stoppedAt?: string;
}

export function toEpisodeStatistics(
  statistics: EpisodeStatisticApiResponse[]
): Statistic[] {
  return statistics.map(toEpisodeStatistic);
}

export function toEpisodeStatistic(
  statistic: EpisodeStatisticApiResponse
): Statistic {
  return {
    id: statistic.id,
    mediaId: statistic.episodeId,
    userId: statistic.userId,
    startedAt: new Date(statistic.startedAt),
    stoppedAt: new Date(statistic.stoppedAt || new Date()),
    type: 'episode',
  };
}
