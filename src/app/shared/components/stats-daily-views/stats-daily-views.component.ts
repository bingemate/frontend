import { Component } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-stats-daily-views',
  templateUrl: './stats-daily-views.component.html',
  styleUrls: ['./stats-daily-views.component.less'],
})
export class StatsDailyViewsComponent {
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [1, 4, 2, 7, 1, 0.2, 10],
        label: 'Temps de visionnage',
        backgroundColor: 'rgba(255, 113, 24, 0.3)',
        borderColor: 'rgb(255, 113, 24)',
        pointBackgroundColor: 'rgb(255, 113, 24)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
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

  public lineChartType: ChartType = 'line';
}
