import { Component, Input, OnInit } from '@angular/core';
import { TvEpisodeResponse } from '../../../../shared/models/media.models';
import { MediaInfoService } from '../../media-info.service';
import { navigationRoot } from '../../../../app-routing.module';
import { streamingLinks } from '../../../../pages/streaming/streaming-routing.module';

@Component({
  selector: 'app-episode-info-list',
  templateUrl: './episode-info-list.component.html',
  styleUrls: ['./episode-info-list.component.less'],
})
export class EpisodeInfoListComponent implements OnInit {
  readonly streamPath = `/${navigationRoot.streaming.path}/${streamingLinks.stream.path}/`;

  @Input() tvShowId = 0;
  @Input() seasonNumber = 0;

  loading = false;

  seasonEpisodes: TvEpisodeResponse[] = [];

  constructor(private mediaInfoService: MediaInfoService) {}

  ngOnInit(): void {
    this.loading = true;
    this.mediaInfoService
      .getTvShowSeasonEpisodesInfo(this.tvShowId, this.seasonNumber)
      .subscribe({
        next: episodes => {
          this.seasonEpisodes = episodes;
        },
        complete: () => {
          this.loading = false;
        },
      });
  }
}
