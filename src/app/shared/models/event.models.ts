import { MediaType } from './media.models';

export interface MediaEvent {
  title: string;
  episode?: string;
  date: Date;
  type: MediaType;
  id: number;
}
