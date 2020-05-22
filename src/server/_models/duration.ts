import { IDuration } from '../_types/graphql';
import { merge } from '../../_shared/merge';
import { Fields } from '../../_shared/types';

const getDefaults = (): Fields<Duration> => ({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

export class Duration implements IDuration {
  public seconds: number;
  public minutes: number;
  public hours: number;
  public days: number;

  constructor(params: Partial<IDuration> = {}) {
    Object.assign(this, merge(getDefaults, params));
  }

  public totalSeconds = (): number => (((this.days * 24 + this.hours) * 60) + this.minutes) * 60 + this.seconds;

  public getMin = (other: Duration): Duration => this.totalSeconds() <= other.totalSeconds()
    ? new Duration(this)
    : new Duration(other);

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
}
