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
import { EpisodePlaylist } from '../../../shared/models/playlist.model';
import { MoviePlaylistsService } from '../../../feature/playlist/movie-playlists.service';
import { playlistViewLinks } from '../../watchlist/watchlist-routing.module';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.less'],
})
export class UserViewComponent {
  userID = '';
  user: UserResponse | null = null;
  userLoading = false;

  comments: CommentResults = emptyCommentResults;
  commentsCurrentPage = 1;

  ratings: RatingResults = emptyRatingResults;
  ratingsCurrentPage = 1;

  playlists: EpisodePlaylist[] = [];
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
    private readonly playlistService: MoviePlaylistsService
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

  onGetUserComments() {
    this.commentService
      .getUserComments(this.userID, this.commentsCurrentPage)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  onRefreshUserComments() {
    this.commentsCurrentPage = 1;
    this.onGetUserComments();
  }

  onGetUserRatings() {
    this.ratingService
      .getUserRating(this.userID, this.ratingsCurrentPage)
      .subscribe(ratings => {
        this.ratings = ratings;
      });
  }

  onRefreshUserRatings() {
    this.ratingsCurrentPage = 1;
    this.onGetUserRatings();
  }

  onCommentsPageChange(page: number) {
    this.commentsCurrentPage = page;
    this.onGetUserComments();
  }

  onRatingsPageChange(page: number) {
    this.ratingsCurrentPage = page;
    this.onGetUserRatings();
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
    this.playlistService.getMoviePlaylists(this.userID).subscribe(playlists => {
      this.playlistsLoading = false;
      this.playlists = playlists;
    });
  }

  protected readonly playlistViewLinks = playlistViewLinks;
}
