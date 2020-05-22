import { CoolDown } from '../../_models/coolDown';
import {
  TaskType,
  VillageTaskType,
} from '../../_types/graphql';

export interface IBotTaskResult {
  readonly nextCoolDown?: CoolDown | null;
}

interface IBotTaskBase {
  readonly allowExecution: () => boolean;
  readonly coolDown: () => CoolDown;
  readonly execute: () => Promise<IBotTaskResult | void>;
}

export interface IBotTask extends IBotTaskBase {
  readonly type: TaskType;
}

export interface IVillageBotTask extends IBotTaskBase {
  readonly type: VillageTaskType;
}
