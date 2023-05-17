import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import 'chartjs-adapter-moment';
@Component({
  selector: 'app-stats-daily-views',
  templateUrl: './stats-daily-views.component.html',
  styleUrls: ['./stats-daily-views.component.less'],
})
export class StatsDailyViewsComponent implements OnChanges {
  @Input()
  data: number[] = [];
  @Input()
  labels: string[] = [];
  readonly lineChartType: ChartType = 'line';
  readonly lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      y: {
        position: 'left',
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  lineChartData: ChartConfiguration['data'] = {
    datasets: [],
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['data'].currentValue !== changes['data'].previousValue &&
      changes['labels'].currentValue !== changes['labels'].previousValue
    ) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    this.lineChartData = {
      datasets: [
        {
          data: this.data,
          label: 'Temps de visionnage',
          backgroundColor: 'rgba(255, 113, 24, 0.3)',
          borderColor: 'rgb(255, 113, 24)',
          pointBackgroundColor: 'rgb(255, 113, 24)',
          fill: 'origin',
        },
      ],
      labels: this.labels,
    };
  }
}
