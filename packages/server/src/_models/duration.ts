import type { PartialFields } from 'shared/types/fields.type.js';
import { getTotalSeconds } from 'shared/utils/getTotalSeconds.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class Duration {
  public readonly days: number = 0;

  public readonly hours: number = 0;

  public readonly minutes: number = 0;

  public readonly seconds: number = 0;

  constructor(params: PartialFields<Duration> = {}) {
    mergeDefaults(this, params);
  }

  static fromSeconds = (totalSeconds: number): Duration => {
    const days = Math.floor(totalSeconds / 86400);
    const daySeconds = days * 86400;
    const hours = Math.floor((totalSeconds - daySeconds) / 3600);
    const hourSeconds = hours * 3600;
    const minutes = Math.floor((totalSeconds - daySeconds - hourSeconds) / 60);
    const minuteSeconds = minutes * 60;
    const seconds = totalSeconds - daySeconds - hourSeconds - minuteSeconds;

    return new Duration({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  static fromText = (text: string): Duration => {
    const params = text.split(':');

    return new Duration({
      hours: +params[0],
      minutes: +params[1],
      seconds: +params[2],
    });
  };

  public getTotalSeconds = (): number => getTotalSeconds(this);

  public getMin = (other: Duration): Duration =>
    this.getTotalSeconds() <= other.getTotalSeconds() ? this : other;

  public multiply = (multiplicator: number, shouldCeil = false): Duration => {
    let newTotalSeconds = this.getTotalSeconds() * multiplicator;

    if (shouldCeil) {
      newTotalSeconds = Math.ceil(newTotalSeconds);
    }

    return Duration.fromSeconds(newTotalSeconds);
  };

  public add = (addition: Duration): Duration =>
    Duration.fromSeconds(this.getTotalSeconds() + addition.getTotalSeconds());

  public isGreaterOrEqual = (other: Duration): boolean =>
    this.getTotalSeconds() >= other.getTotalSeconds();
}
