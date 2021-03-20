import type { Duration } from 'shared/types/duration.type.js';

export type CoolDown = {
  readonly min: Duration;
  readonly max: Duration;
};