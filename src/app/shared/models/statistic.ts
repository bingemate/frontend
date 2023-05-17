export interface Statistic {
  id: string;
  userId: string;
  mediaId: string;
  startedAt: Date;
  stoppedAt: Date;
}

export interface StatisticApiResponse {
  id: string;
  userId: string;
  mediaId: string;
  startedAt: string;
  stoppedAt?: string;
}

export function toStatistics(statistics: StatisticApiResponse[]): Statistic[] {
  return statistics.map(toStatistic);
}

export function toStatistic(statistic: StatisticApiResponse): Statistic {
  return {
    id: statistic.id,
    mediaId: statistic.mediaId,
    userId: statistic.userId,
    startedAt: new Date(statistic.startedAt),
    stoppedAt: new Date(statistic.stoppedAt || new Date()),
  };
}
