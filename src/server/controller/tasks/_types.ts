import { CoolDown } from '../../_models/coolDown';
import {
  TaskType,
  VillageTaskType,
} from '../../_types/graphql';

export type BotTaskResult = {
  readonly nextCoolDown?: CoolDown | null;
};

type BotTaskBase = {
  readonly allowExecution: () => boolean;
  readonly coolDown: () => CoolDown;
  readonly execute: () => Promise<BotTaskResult | void>;
};

export type BotTask = BotTaskBase & {
  readonly type: TaskType;
};

export type VillageBotTask = BotTaskBase & {
  readonly type: VillageTaskType;
};
