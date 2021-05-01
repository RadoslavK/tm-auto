import type { VillageTaskType } from 'shared/enums/TaskType.js';

import type { Village } from '../../_models/village/village.js';
import { AccountContext } from '../../accountContext.js';
import {
  BotTaskBase,
  BotTaskEngine,
  BotTaskEngineWithCoolDown,
  BotTaskWithCoolDown,
  IBotTaskEngine,
  VillageBotTask,
  VillageBotTaskWithCoolDown,
} from './botTaskEngine.js';

const isTaskWithCooldown = (task: BotTaskBase): task is VillageBotTaskWithCoolDown =>
  (task as BotTaskWithCoolDown).coolDown !== undefined;

export class VillageBotTasksEngine {
  private readonly _tasks: ReadonlyMap<VillageTaskType, IBotTaskEngine>;

  constructor(
    private village: Village,
    tasks: { new (village: Village): VillageBotTask | VillageBotTaskWithCoolDown }[],
  ) {
    this._tasks = tasks.reduce((allTasks, Task) => {
      const task = new Task(village);
      const type = task.type;

      let engine: IBotTaskEngine;

      if (isTaskWithCooldown(task)) {
        engine = new BotTaskEngineWithCoolDown({
          task,
          getNextExecution: () =>
            AccountContext.getContext().nextExecutionService.getForVillage(
              village.id,
              task.type,
            ),
          setNextExecution: (nextExecution) => {
            AccountContext.getContext().nextExecutionService.setForVillage(
              village.id,
              task.type,
              nextExecution,
            );
          },
        });
      } else {
        engine = new BotTaskEngine(task);
      }

      allTasks.set(type, engine);

      return allTasks;
    }, new Map<VillageTaskType, IBotTaskEngine>());
  }

  public isExecutionReady = (): boolean =>
    [...this._tasks.values()].some((t) => t.isExecutionReady());

  public execute = async (): Promise<void> => {
    for (const task of this.getSortedTasks()) {
      await task.execute();
    }
  };

  private getSortedTasks = (): ReadonlyArray<IBotTaskEngine> => {
    const { tasksOrder } = AccountContext.getContext().settingsService.village(this.village.id).general.get();

    const sortedTasks = tasksOrder
      .map(taskType => {
        const task = this._tasks.get(taskType);

        if (!task) {
          throw new Error(`Did not find task for type ${taskType}`);
        }

        return task;
      });

    if (sortedTasks.length !== this._tasks.size) {
      throw new Error('Some tasks are not included in sorted list');
    }

    return sortedTasks;
  };
}
