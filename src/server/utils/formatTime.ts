import { IDuration } from '../_types/graphql';

export const formatTime = (date: Date): string => {
  const hours = date.getHours() > 9 ? `${date.getHours()}` : `0${date.getHours()}`;
  const mins = date.getMinutes() > 9 ? `${date.getMinutes()}` : `0${date.getMinutes()}`;
  const sec = date.getSeconds() > 9 ? `${date.getSeconds()}` : `0${date.getSeconds()}`;

  return `${hours}:${mins}:${sec}`;
};

export const formatTimeFromSeconds = (seconds: number): string => {
  const time = new Date(0, 0, 0, 0, 0, seconds);
  return formatTime(time);
};

export const formatTimeFromDuration = (duration: IDuration): string => {
  const time = new Date(0, 0, 0, duration.hours, duration.minutes, duration.seconds);
  return formatTime(time);
};
