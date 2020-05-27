import { mergeDefaults } from '../../_shared/merge';
import { PartialFields } from '../../_shared/types/fields.type';
import { Duration } from './duration';

export class CoolDown {
  public readonly max: Duration = new Duration();
  public readonly min: Duration = new Duration();

  constructor(params: PartialFields<CoolDown> = {}) {
    mergeDefaults(this, params);
  }

  static fromDuration = (duration: Duration): CoolDown => new CoolDown({
    max: duration,
    min: duration,
  });

  public getRandomDelay = (): number => {
    const minTotalSeconds = this.min.getTotalSeconds();
    const maxTotalSeconds = this.max.getTotalSeconds();

    return Math.floor(Math.random() * (maxTotalSeconds - minTotalSeconds + 1)) + minTotalSeconds;
  };

  public mergeMin = (other: CoolDown): CoolDown => new CoolDown({
    max: this.max.getMin(other.max),
    min: this.min.getMin(other.min),
  });
}