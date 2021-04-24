import { BotEvent } from '../events/botEvent.js';
import { publishPayloadEvent } from '../pubSub.js';

export class BotActivityService {
  private activity: string = '';

  public getActivity = (): string => this.activity;

  public setActivity = (activity: string): void => {
    if (activity === this.activity) {
      return;
    }

    this.activity = activity;
    publishPayloadEvent(BotEvent.BotActivityChanged, {
      botActivity: activity,
    });
  }
}

export const activityService: BotActivityService = new BotActivityService();