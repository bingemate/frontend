import { Component } from '@angular/core';
import { UserResponse } from '../../../shared/models/user.models';
import {
  CommentResults,
  emptyCommentResults,
} from '../../../shared/models/comment.models';
import {
  emptyRatingResults,
  RatingResults,
} from '../../../shared/models/rating.models';
import { CommentService } from '../../../feature/comment/comment.service';
import { RatingService } from '../../../feature/rating/rating.service';
import { UserService } from '../../../feature/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { userProfilViewLinks } from '../social-network-routing.module';
import { FriendResponse } from '../../../shared/models/friendship.models';
import { FriendshipService } from '../../../feature/friendship/friendship.service';
import { MoviePlaylistsService } from '../../../feature/playlist/movie-playlists.service';
import { playlistViewLinks } from '../../watchlist/watchlist-routing.module';
import { EpisodePlaylist } from '../../../shared/models/episode-playlist.model';
import { MoviePlaylist } from '../../../shared/models/movie-playlist.model';
import { EpisodePlaylistsService } from '../../../feature/playlist/episode-playlists.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.less'],
})
export class UserViewComponent {
  userID = '';
  user: UserResponse | null = null;
  userLoading = false;

  movieComments: CommentResults = emptyCommentResults;
  movieCommentsCurrentPage = 1;

  movieRatings: RatingResults = emptyRatingResults;
  movieRatingsCurrentPage = 1;

  tvComments: CommentResults = emptyCommentResults;
  tvCommentsCurrentPage = 1;

  tvRatings: RatingResults = emptyRatingResults;
  tvRatingsCurrentPage = 1;

  episodePlaylists: EpisodePlaylist[] = [];
  moviePlaylists: MoviePlaylist[] = [];
  playlistsLoading = false;

  friends: FriendResponse[] = [];
  friendsLoading = false;

  constructor(
    private readonly currentRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly commentService: CommentService,
    private readonly ratingService: RatingService,
    private readonly userService: UserService,
    private readonly friendshipService: FriendshipService,
    private readonly episodePlaylistService: EpisodePlaylistsService,
    private readonly moviePlaylistService: MoviePlaylistsService
  ) {
    this.currentRoute.params.subscribe(params => {
      this.userID = params['id'];
      this.getUser();
      this.onGetUserFriends();
    });
  }

  getUser() {
    this.userLoading = true;
    this.userService.getUser(this.userID).subscribe(user => {
      this.user = user;
      this.userLoading = false;
    });
  }

  onGetUserMovieComments() {
    this.commentService
      .getUserMovieComments(this.userID, this.movieCommentsCurrentPage)
      .subscribe(comments => {
        this.movieComments = comments;
      });
  }

  onGetUserTvComments() {
    this.commentService
      .getUserTvComments(this.userID, this.tvCommentsCurrentPage)
      .subscribe(comments => {
        this.tvComments = comments;
      });
  }

  onMovieCommentsPageChange(page: number): void {
    this.movieCommentsCurrentPage = page;
    this.onGetUserMovieComments();
  }

  onTvCommentsPageChange(page: number): void {
    this.tvCommentsCurrentPage = page;
    this.onGetUserTvComments();
  }

  onRefreshAllComments(): void {
    this.movieCommentsCurrentPage = 1;
    this.tvCommentsCurrentPage = 1;
    this.onGetUserMovieComments();
    this.onGetUserTvComments();
  }

  onRefreshMovieComments(): void {
    this.movieCommentsCurrentPage = 1;
    this.onGetUserMovieComments();
  }

  onRefreshTvComments(): void {
    this.tvCommentsCurrentPage = 1;
    this.onGetUserTvComments();
  }

  onGetUserMovieRatings() {
    this.ratingService
      .getUserMovieRatings(this.userID, this.movieRatingsCurrentPage)
      .subscribe(ratings => {
        this.movieRatings = ratings;
      });
  }

  onGetUserTvRatings() {
    this.ratingService
      .getUserTvRatings(this.userID, this.tvRatingsCurrentPage)
      .subscribe(ratings => {
        this.tvRatings = ratings;
      });
  }

  onMovieRatingsPageChange(page: number): void {
    this.movieRatingsCurrentPage = page;
    this.onGetUserMovieRatings();
  }

  onTvRatingsPageChange(page: number): void {
    this.tvRatingsCurrentPage = page;
    this.onGetUserTvRatings();
  }

  onRefreshAllRatings(): void {
    this.movieRatingsCurrentPage = 1;
    this.tvRatingsCurrentPage = 1;
    this.onGetUserMovieRatings();
    this.onGetUserTvRatings();
  }

  onRefreshMovieRatings(): void {
    this.movieRatingsCurrentPage = 1;
    this.onGetUserMovieRatings();
  }

  onRefreshTvRatings(): void {
    this.tvRatingsCurrentPage = 1;
    this.onGetUserTvRatings();
  }

  onViewUser(userID: string) {
    this.router
      .navigate([userProfilViewLinks, userID], {
        onSameUrlNavigation: 'reload',
      })
      .then();
  }

  onGetUserFriends() {
    this.friendsLoading = true;

    this.friendshipService.getUserFriends(this.userID).subscribe(friends => {
      this.friendsLoading = false;
      this.friends = friends;
    });
  }

  onGetUserPlaylists() {
    this.playlistsLoading = true;
    this.episodePlaylistService
      .getEpisodePlaylists(this.userID)
      .subscribe(playlists => {
        this.playlistsLoading = false;
        this.episodePlaylists = playlists;
      });
    this.moviePlaylistService
      .getMoviePlaylists(this.userID)
      .subscribe(playlists => {
        this.playlistsLoading = false;
        this.moviePlaylists = playlists;
      });
  }

  protected readonly playlistViewLinks = playlistViewLinks;
}
