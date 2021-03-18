import { Duration } from '../_models/duration.js';

export const convertDelayToDate = (delay: Duration): Date => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + delay.getTotalSeconds());

  return date;
};
