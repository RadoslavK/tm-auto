import { Duration } from '../_graphql/graphqlHooks';
import { Duration as DurationModel } from '../../../server/_models/duration';

export const formatTimeFromDuration = (duration: Duration): string => {
  const {
    days,
    hours,
    minutes,
    seconds,
  } = duration;

  const correctedHours = hours > 9 ? `${hours}` : `0${hours}`;
  const correctedMinutes = minutes > 9 ? `${minutes}` : `0${minutes}`;
  const correctedSeconds = seconds > 9 ? `${seconds}` : `0${seconds}`;

  return `${days}:${correctedHours}:${correctedMinutes}:${correctedSeconds}`;
};

export const formatTimeFromSeconds = (seconds: number): string => formatTimeFromDuration(DurationModel.fromSeconds(seconds));
