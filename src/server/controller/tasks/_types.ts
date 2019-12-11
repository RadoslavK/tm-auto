import { CoolDown } from '../../_models/coolDown';
import {
  TaskType,
  VillageTaskType,
} from '../../_types/graphql';

interface IBotTaskResult {
  readonly nextCoolDown?: CoolDown | null;
}

export type BotTaskResult = Promise<IBotTaskResult | void>;

interface IBotTaskBase {
  readonly allowExecution: () => boolean;
  readonly coolDown: () => CoolDown;
  readonly execute: () => BotTaskResult;
}

export interface IBotTask extends IBotTaskBase {
  readonly type: TaskType;
}

export interface IVillageBotTask extends IBotTaskBase {
  readonly type: VillageTaskType;
}
