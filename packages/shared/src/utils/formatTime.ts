import type { Duration } from '../types/duration.type.js';

export const formatTime = (duration: Duration): string => {
  const { days, hours, minutes, seconds } = duration;

  const correctedHours = hours > 9 ? `${hours}` : `0${hours}`;
  const correctedMinutes = minutes > 9 ? `${minutes}` : `0${minutes}`;
  const correctedSeconds = seconds > 9 ? `${seconds}` : `0${seconds}`;

  return `${days}:${correctedHours}:${correctedMinutes}:${correctedSeconds}`;
};
export const formatTimeFromSeconds = (totalSeconds: number): string => {
  if (!totalSeconds) {
    return '0:00:00:0?';
  }

  // TODO better shared models
  const days = Math.floor(totalSeconds / 86400);
  const daySeconds = days * 86400;
  const hours = Math.floor((
    totalSeconds - daySeconds
  ) / 3600);
  const hourSeconds = hours * 3600;
  const minutes = Math.floor((
    totalSeconds - daySeconds - hourSeconds
  ) / 60);
  const minuteSeconds = minutes * 60;
  const seconds = totalSeconds - daySeconds - hourSeconds - minuteSeconds;

  const duration: Duration = {
    days,
    hours,
    minutes,
    seconds,
  };

  return formatTime(duration);
};