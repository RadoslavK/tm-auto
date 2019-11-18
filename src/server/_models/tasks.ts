import { ITaskSettings } from '../_types/ITaskSettings';
import { CoolDown } from './coolDown';

export interface IBotTaskResultParams {
  readonly nextCoolDown?: CoolDown | null;
}

export type BotTaskResult = Promise<IBotTaskResultParams | void>;

export interface IBotTask {
  readonly settings: () => ITaskSettings;
  readonly execute: () => BotTaskResult;
}