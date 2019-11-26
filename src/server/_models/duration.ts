import { Fields } from '../../_shared/types';
import { merge } from '../../_shared/merge';

export interface IDurationParams {
  readonly seconds: number;
  readonly minutes: number;
  readonly hours: number;
}

const defaults: Fields<Duration> = {
  seconds: 0,
  minutes: 0,
  hours: 0,
};

export class Duration implements IDurationParams {
  public seconds: number;
  public minutes: number;
  public hours: number;

  constructor(params: Partial<IDurationParams> = {}) {
    Object.assign(this, merge(defaults, params));
  }

  public totalSeconds = (): number => ((this.hours * 60) + this.minutes) * 60 + this.seconds;

  public getMin = (other: Duration): Duration => {
    return this.totalSeconds() <= other.totalSeconds()
      ? new Duration(this)
      : new Duration(other);
  };

  public multiply = (multiplicator: number): Duration => Duration.fromSeconds(this.totalSeconds() * multiplicator);

  public add = (addition: Duration): Duration => Duration.fromSeconds(this.totalSeconds() + addition.totalSeconds());

  public static fromText = (text: string): Duration => {
    const params = text.split(':');

    return new Duration({
      hours: +params[0],
      minutes: +params[1],
      seconds: +params[2],
    });
  };

  public static fromSeconds = (totalSeconds: number): Duration => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
    const seconds = totalSeconds - hours * 3600 - minutes * 60;

    return new Duration({
      hours,
      minutes,
      seconds
    });
  };
}