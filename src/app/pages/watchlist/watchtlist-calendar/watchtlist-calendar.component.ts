import { Component } from '@angular/core';

@Component({
  selector: 'app-watchtlist-calendar',
  templateUrl: './watchtlist-calendar.component.html',
  styleUrls: ['./watchtlist-calendar.component.less'],
})
export class WatchtlistCalendarComponent {
  events: Event[] = [
    {
      title: 'The Mandalorian',
      episode: '3x1',
      date: new Date('2023-03-01'),
    },
    {
      title: 'The Bad Batch',
      episode: '2x9',
      date: new Date('2023-02-15'),
    },
    {
      title: 'The Bad Batch',
      episode: '2x10',
      date: new Date('2023-02-22'),
    },
    {
      title: 'South Park',
      episode: '26x1',
      date: new Date('2023-02-09'),
    },
    {
      title: 'South Park',
      episode: '26x2',
      date: new Date('2023-02-16'),
    },
    {
      title: 'South Park',
      episode: '26x3',
      date: new Date('2023-03-02'),
    },
    {
      title: 'The Last Of Us',
      episode: '1x3',
      date: new Date('2023-01-30'),
    },
    {
      title: 'The Last Of Us',
      episode: '1x4',
      date: new Date('2023-02-06'),
    },
    {
      title: 'The Last Of Us',
      episode: '1x5',
      date: new Date('2023-02-13'),
    },
    {
      title: 'The Last Of Us',
      episode: '1x6',
      date: new Date('2023-02-20'),
    },
    {
      title: 'The Last Of Us',
      episode: '1x7',
      date: new Date('2023-02-27'),
    },
  ];

  getEventColor(event: Event): string {
    return badgeColors[
      event.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
        badgeColors.length
    ];
  }

  getEventsFromDate(date: Date): Event[] {
    return this.events.filter(
      event => event.date.toDateString() === date.toDateString()
    );
  }

  getEventTitle(event: Event): string {
    return event.episode ? `${event.title} - ${event.episode}` : event.title;
  }
}

type Event = {
  title: string;
  episode?: string;
  date: Date;
};

const badgeColors = [
  'pink',
  'red',
  'yellow',
  'orange',
  'cyan',
  'green',
  'blue',
  'purple',
  'geekblue',
  'magenta',
  'volcano',
  'gold',
  'lime',
];
