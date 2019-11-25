import { CoolDown } from './coolDown';

export interface IBotTaskResultParams {
  readonly nextCoolDown?: CoolDown | null;
}

export type BotTaskResult = Promise<IBotTaskResultParams | void>;

export interface IBotTask {
  readonly allowExecution: () => boolean;
  readonly coolDown: () => CoolDown;
  readonly execute: () => BotTaskResult;
}