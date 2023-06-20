import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { WatchTogetherService } from '../../watch-together/watch-together.service';
import { map, Observable, Subject, Subscription, switchMap } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { MediaDiscoverService } from '../../media-info/media-discover.service';
import { WatchTogetherState } from '../../watch-together/store/watch-together.state';
import { WatchTogetherRoom } from '../../../shared/models/watch-together.models';

@Component({
  selector: 'app-add-media-stream',
  templateUrl: './add-media-stream.component.html',
  styleUrls: ['./add-media-stream.component.less'],
})
export class AddMediaStreamComponent implements OnInit, OnDestroy {
  input = '';
  searchSubject = new Subject<string>();
  options: { value: number; label: string }[] = [];

  @Select(WatchTogetherState.joinedRoom)
  room$!: Observable<WatchTogetherRoom>;
  room?: WatchTogetherRoom;

  private subscriptions: Subscription[] = [];

  constructor(
    private readonly store: Store,
    private readonly watchTogetherService: WatchTogetherService,
    private mediaDiscoverService: MediaDiscoverService
  ) {}

  ngOnInit() {
    this.subscriptions.push(this.room$.subscribe(room => (this.room = room)));
    this.subscriptions.push(
      this.searchSubject
        .pipe(debounceTime(300))
        .pipe(
          switchMap(query =>
            this.mediaDiscoverService.searchMovies(query, 1, true).pipe(
              map(movies =>
                movies.results.map(movie => ({
                  label: movie.title,
                  value: movie.id,
                }))
              )
            )
          )
        )
        .subscribe(options => (this.options = options))
    );
  }

  search() {
    this.searchSubject.next(this.input);
  }

  selectedMedia(mediaId: number) {
    this.options = [];
    this.input = '';
    this.watchTogetherService.addMedia(mediaId);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
