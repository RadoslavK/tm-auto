import {
  Duration,
  IDurationParams,
} from './duration';
import { Fields } from '../../_shared/types';
import { merge } from '../../_shared/merge';

export interface ICoolDownParams {
  readonly min: IDurationParams;
  readonly max: IDurationParams;
}

const defaults: Fields<CoolDown> = {
  max: new Duration(),
  min: new Duration(),
};

export class CoolDown implements ICoolDownParams {
  min: Duration;
  max: Duration;

  constructor(params: Partial<ICoolDownParams> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      min: params.min && new Duration(params.min),
      max: params.max && new Duration(params.max),
    }));
  }

  public randomDelay = (): number => {
    const minTotalSeconds = this.min.totalSeconds();
    const maxTotalSeconds = this.max.totalSeconds();

    return Math.floor(Math.random() * (maxTotalSeconds - minTotalSeconds + 1)) + minTotalSeconds;
  };

  public getMin = (other: CoolDown): CoolDown => new CoolDown({
    min: this.min.getMin(other.min),
    max: this.max.getMin(other.max),
  });

  static fromDuration = (duration: Duration): CoolDown => new CoolDown({
    min: duration,
    max: duration,
  });
}
