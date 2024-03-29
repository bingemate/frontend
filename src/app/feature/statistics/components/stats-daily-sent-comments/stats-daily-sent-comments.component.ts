import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { fr } from 'date-fns/locale';
import { format } from 'date-fns';
import {
  CommentStat,
  STAT_COLORS,
  StatDisplay,
} from '../../../../shared/models/statistic.models';
import { getDateDays } from '../../../../shared/utils/date.utils';

@Component({
  selector: 'app-stats-daily-sent-comments',
  templateUrl: './stats-daily-sent-comments.component.html',
  styleUrls: ['./stats-daily-sent-comments.component.less'],
})
export class StatsDailySentCommentsComponent implements OnInit, OnChanges {
  @Input()
  commentStat: CommentStat[] = [];
  readonly lineChartType: ChartType = 'line';
  readonly lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
        position: 'left',
      },
    },
  };
  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
  };
  selectedPeriod = '7 jours';
  commentSevenDays: StatDisplay = { data: [], labels: [] };
  commentOneMonth: StatDisplay = { data: [], labels: [] };
  commentSixMonth: StatDisplay = { data: [], labels: [] };

  ngOnInit(): void {
    this.updateCommentData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['commentStat'].currentValue !==
      changes['commentStat'].previousValue
    ) {
      this.updateCommentData();
    }
  }

  private updateCommentData() {
    this.commentSevenDays = this.getPeriodData(this.commentStat, 7);
    this.commentOneMonth = this.getPeriodData(this.commentStat, 30);
    this.commentSixMonth = this.getPeriodData(this.commentStat, 180);
    if (this.selectedPeriod === '7 jours') {
      this.setDailySentSevenDaysPeriod();
    } else if (this.selectedPeriod === '1 mois') {
      this.setDailySentMonthPeriod();
    } else {
      this.setDailySentSemesterPeriod();
    }
  }

  setDailySentSevenDaysPeriod() {
    this.selectedPeriod = '7 jours';
    this.updateChartData(this.commentSevenDays);
  }

  setDailySentMonthPeriod() {
    this.selectedPeriod = '1 mois';
    this.updateChartData(this.commentOneMonth);
  }

  setDailySentSemesterPeriod() {
    this.selectedPeriod = '6 mois';
    this.updateChartData(this.commentSixMonth);
  }

  private updateChartData(commentData: StatDisplay): void {
    this.lineChartData = {
      datasets: [
        {
          data: commentData.data,
          label: 'Commentaires',
          fill: 'origin',
          ...STAT_COLORS.COMMENT_COLOR,
        },
      ],
      labels: commentData.labels,
    };
  }

  private getPeriodData(stats: readonly CommentStat[], period: number) {
    const dataMap: Map<string, number> = new Map<string, number>();
    const currentDate = new Date();
    currentDate.setDate(new Date().getDate() - period);
    while (currentDate.getTime() <= new Date().getTime()) {
      dataMap.set(format(new Date(currentDate), 'dd MMMM', { locale: fr }), 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    let statsFiltered = stats.filter(
      stat =>
        getDateDays(new Date().getTime()) - getDateDays(stat.date.getTime()) <=
        period
    );
    statsFiltered = statsFiltered.sort(
      (a, b) => a.date.getTime() - b.date.getTime()
    );
    this.getDailySentComments(statsFiltered, dataMap);
    const labels = Array.from(dataMap.keys());
    const data = Array.from(dataMap.values());
    return { data, labels };
  }

  private getDailySentComments(
    stats: CommentStat[],
    data: Map<string, number>
  ) {
    stats.forEach(stat => {
      const key = format(stat.date, 'dd MMMM', { locale: fr });
      data.set(key, stat.count);
    });
    return data;
  }
}
