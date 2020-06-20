import { mergeDefaults } from '../../_shared/merge';
import { PartialFields } from '../../_shared/types/fields.type';

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

  public getTotalSeconds = (): number =>
    ((this.days * 24 + this.hours) * 60 + this.minutes) * 60 + this.seconds;

  public getMin = (other: Duration): Duration =>
    this.getTotalSeconds() <= other.getTotalSeconds() ? this : other;

  public multiply = (multiplicator: number): Duration =>
    Duration.fromSeconds(this.getTotalSeconds() * multiplicator);

  public add = (addition: Duration): Duration =>
    Duration.fromSeconds(this.getTotalSeconds() + addition.getTotalSeconds());
}
