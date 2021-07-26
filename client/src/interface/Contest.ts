import { Moment } from 'moment';

export interface Contest {
  title: string;
  description: string;
  prizeAmount: number;
  deadlineDate: Moment;
  images: Array<string>;
}
