import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { Playlist } from "../../../shared/models/playlist.model";
import { PlaylistsState } from "../../../feature/playlist/store/playlists.state";
import { PlaylistsActions } from "../../../feature/playlist/store/playlists.actions";

@Component({
  selector: "app-playlists",
  templateUrl: "./playlists.component.html",
  styleUrls: ["./playlists.component.less"]
})
export class PlaylistsComponent implements OnInit {
  @Select(PlaylistsState.playlists) playlists$!: Observable<Playlist[]>;

  playlists: Playlist[] = [
    {
      name: "Test",
      userId: "id",
      id: "id"
    }
  ];
  isPlaylistShown: boolean = false;
  isConfirmLoading: boolean = false;
  playlistName: string | undefined;

  constructor(private readonly store: Store) {
  }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isPlaylistShown = true;
  }

  closeModal() {
    this.isPlaylistShown = false;
  }

  createPlaylist() {
    this.isConfirmLoading = true;
    this.store.dispatch(new PlaylistsActions.CreatePlaylist({ name: this.playlistName! }))
      .subscribe(() => {
        this.isConfirmLoading = false;
        this.closeModal();
      });
  }
}
