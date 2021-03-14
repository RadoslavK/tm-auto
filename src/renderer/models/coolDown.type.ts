import { Duration } from '../../_shared/types/duration.type';

export type CoolDown = {
  readonly min: Duration;
  readonly max: Duration;
};