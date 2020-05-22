import { ICoolDown } from '../_types/graphql';
import { merge } from '../../_shared/merge';
import { Fields } from '../../_shared/types';
import { Duration } from './duration';

const getDefaults = (): Fields<CoolDown> => ({
  max: new Duration(),
  min: new Duration(),
});

export class CoolDown implements ICoolDown {
  public min: Duration;
  public max: Duration;

  constructor(params: Partial<ICoolDown> = {}) {
    Object.assign(this, merge(getDefaults, {
      ...params,
      max: params.max && new Duration(params.max),
      min: params.min && new Duration(params.min),
    }));
  }

  public randomDelay = (): number => {
    const minTotalSeconds = this.min.totalSeconds();
    const maxTotalSeconds = this.max.totalSeconds();

    return Math.floor(Math.random() * (maxTotalSeconds - minTotalSeconds + 1)) + minTotalSeconds;
  };

  public getMin = (other: CoolDown): CoolDown => new CoolDown({
    max: this.max.getMin(other.max),
    min: this.min.getMin(other.min),
  });

  static fromDuration = (duration: Duration): CoolDown => new CoolDown({
    max: duration,
    min: duration,
  });
}
