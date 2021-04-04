import type { Duration } from '../types/duration.type.js';

export const getTotalSeconds = (duration: Duration): number =>
  ((duration.days * 24 + duration.hours) * 60 + duration.minutes) * 60 + duration.seconds;