import { CoolDown } from '../../_models/coolDown';

interface IBotTaskResult {
  readonly nextCoolDown?: CoolDown | null;
}

export type BotTaskResult = Promise<IBotTaskResult | void>;

export interface IBotTask {
  readonly allowExecution: () => boolean;
  readonly coolDown: () => CoolDown;
  readonly execute: () => BotTaskResult;
}