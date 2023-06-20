import { MoviePlaylist } from './movie-playlist.model';
import { EpisodePlaylist } from './episode-playlist.model';

export interface StreamingStateModel {
  moviePlaylist?: MoviePlaylist;
  episodePlaylist?: EpisodePlaylist;
  type?: 'movies' | 'tv-shows';
  position: number;
  autoplay: boolean;
}

export enum StreamStatusEnum {
  STARTED = 'STARTED',
  PLAYING = 'PLAYING',
  STOPPED = 'STOPPED',
}

export interface StreamUpdateEvent {
  watchStatus: StreamStatusEnum;
  stoppedAt: number;
}

export interface SubscriptionIdResponse {
  id: string;
}

export interface SubscriptionResponse {
  status:
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'paused'
    | 'trialing'
    | 'unpaid';
  price: number;
  isCanceled: boolean;
  startedAt: number;
  nextPaymentAt: number;
  endAt: number;
  discount: DiscountResponse;
}

export interface DiscountResponse {
  code: string;
  percent: number;
}

export interface CreateSubscriptionRequest {
  userId: string;
  cancelAt?: number;
}

export interface CreateCustomerRequest {
  userId: string;
  name: string;
  email: string;
}

export interface SubscriptionModel {
  status:
    | 'active'
    | 'canceled'
    | 'incomplete'
    | 'incomplete_expired'
    | 'past_due'
    | 'paused'
    | 'trialing'
    | 'unpaid';
  price: number;
  isCanceled: boolean;
  startedAt: Date;
  nextPaymentAt: Date;
  endAt: Date;
  discount: DiscountResponse;
}

export function toSubscription(
  subscription: SubscriptionResponse
): SubscriptionModel {
  return {
    price: subscription.price,
    status: subscription.status,
    isCanceled: subscription.isCanceled,
    startedAt: new Date(subscription.startedAt * 1000),
    nextPaymentAt: new Date(subscription.nextPaymentAt * 1000),
    endAt: new Date(subscription.endAt * 1000),
    discount: subscription.discount,
  };
}
