import { Moment } from 'moment';

export interface NewContest {
  title: string;
  description: string;
  prizeAmount: number;
  deadlineDate: Moment;
  images: Array<string>;
}
