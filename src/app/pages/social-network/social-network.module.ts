import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialNetworkRoutingModule } from './social-network-routing.module';
import { SocialNetworkHomeComponent } from './social-network-home/social-network-home.component';
import { MediaInfoModule } from '../../feature/media-info/media-info.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { UserSearchComponent } from './user-search/user-search.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from '../../feature/user/user.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { CommentModule } from '../../feature/comment/comment.module';
import { RatingModule } from '../../feature/rating/rating.module';
import { UserViewComponent } from './user-view/user-view.component';
import { FriendshipComponent } from './friendship/friendship.component';
import { FriendshipModule } from '../../feature/friendship/friendship.module';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzListModule } from 'ng-zorro-antd/list';
import { MessagingComponent } from './messaging/messaging.component';
import { SharedModule } from '../../shared/shared.module';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { StatisticsFeatureModule } from '../../feature/statistics/statistics-feature.module';

@NgModule({
  declarations: [
    SocialNetworkHomeComponent,
    UserSearchComponent,
    MessagingComponent,
    UserViewComponent,
    FriendshipComponent,
  ],
  imports: [
    CommonModule,
    SocialNetworkRoutingModule,
    MediaInfoModule,
    NzDividerModule,
    NzLayoutModule,
    NzIconModule,
    NzPageHeaderModule,
    NzCollapseModule,
    NzPaginationModule,
    NzSkeletonModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzCheckboxModule,
    NzInputModule,
    NzProgressModule,
    NzSpaceModule,
    NzWaveModule,
    ReactiveFormsModule,
    FormsModule,
    UserModule,
    NzTabsModule,
    NzDescriptionsModule,
    NzTagModule,
    CommentModule,
    RatingModule,
    FriendshipModule,
    NzSpinModule,
    NzListModule,
    SharedModule,
    NzAvatarModule,
    NzCommentModule,
    NzPopconfirmModule,
    NzSegmentedModule,
    NzModalModule,
    NzResultModule,
    StatisticsFeatureModule,
  ],
})
export class SocialNetworkModule {}
