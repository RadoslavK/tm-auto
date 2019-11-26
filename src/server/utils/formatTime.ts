import { IDuration } from '../_types/graphql';
import { Duration } from '../_models/duration';

export const formatTimeFromDuration = (duration: IDuration): string => {
  const {
    hours,
    minutes,
    seconds,
  } = duration;

  const correctedHours = hours > 9 ? `${hours}` : `0${hours}`;
  const correctedMinutes = minutes > 9 ? `${minutes}` : `0${minutes}`;
  const correctedSeconds = seconds > 9 ? `${seconds}` : `0${seconds}`;

  return `${correctedHours}:${correctedMinutes}:${correctedSeconds}`;
};

export const formatTimeFromSeconds = (seconds: number): string => {
  return formatTimeFromDuration(Duration.fromSeconds(seconds));
};
