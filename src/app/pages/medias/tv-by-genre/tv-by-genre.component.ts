import { Component, OnInit } from '@angular/core';
import { TvShowResponse } from '../../../shared/models/media.models';
import { ActivatedRoute } from '@angular/router';
import { MediaDiscoverService } from '../../../feature/media-info/media-discover.service';
import { MediaAssetsService } from '../../../feature/media-info/media-assets.service';

@Component({
  selector: 'app-tv-by-genre',
  templateUrl: './tv-by-genre.component.html',
  styleUrls: ['./tv-by-genre.component.less'],
})
export class TvByGenreComponent implements OnInit {
  genreId = 0;
  genreName = '';

  tvShows: TvShowResponse[] = [];
  tvShowsPage = 1;
  tvShowsTotalPages = 0;
  tvShowsTotalResults = 0;

  constructor(
    private route: ActivatedRoute,
    private mediaDiscoverService: MediaDiscoverService,
    private mediaAssetsService: MediaAssetsService
  ) {
    this.route.params.subscribe(params => {
      this.genreId = params['id'];
    });
  }

  ngOnInit(): void {
    this.getTvShows();
    this.getGenreName();
  }

  getTvShows(): void {
    this.mediaDiscoverService
      .getTvShowsByGenre(this.genreId, this.tvShowsPage)
      .subscribe(tvShows => {
        this.tvShowsTotalPages = tvShows.totalPage;
        this.tvShowsTotalResults = tvShows.totalResult;
        this.tvShows = tvShows.results;
      });
  }

  getGenreName(): void {
    this.mediaAssetsService.getTvShowGenre(this.genreId).subscribe(genre => {
      this.genreName = genre.name;
    });
  }

  onTvShowsPageChange(page: number): void {
    this.tvShowsPage = page;
    this.getTvShows();
  }

  protected readonly Math = Math;
}
