import { Playlist } from './playlist.model';

export interface StreamingStateModel {
  playlist?: Playlist;
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

export interface SubscriptionResponse {
  status: string;
  price: number;
  isCanceled: boolean;
  paymentMethod: 'card' | 'paypal';
  startedAt: number;
  nextPaymentAt: number;
  endAt: number;
}

export interface SubscriptionModel {
  status: string;
  price: number;
  isCanceled: boolean;
  paymentMethod: 'card' | 'paypal';
  startedAt: Date;
  nextPaymentAt: Date;
  endAt: Date;
}

export function toSubscription(
  subscription: SubscriptionResponse
): SubscriptionModel {
  return {
    price: subscription.price,
    status: subscription.status,
    isCanceled: subscription.isCanceled,
    paymentMethod: subscription.paymentMethod,
    startedAt: new Date(subscription.nextPaymentAt * 1000),
    nextPaymentAt: new Date(subscription.nextPaymentAt * 1000),
    endAt: new Date(subscription.endAt * 1000),
  };
}
