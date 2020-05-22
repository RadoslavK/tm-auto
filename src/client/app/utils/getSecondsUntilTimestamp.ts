import { ITimestamp } from '../../_types/graphql';

export const getSecondsUntilTimestamp = (timestamp: ITimestamp): number => Math.max(
  0,
  timestamp.totalSeconds - Math.floor(new Date().getTime() / 1000),
);