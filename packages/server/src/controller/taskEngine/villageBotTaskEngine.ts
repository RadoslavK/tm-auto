import type { Village } from '../../_models/village/village.js';
import { AccountContext } from '../../accountContext.js';
import {
  BotTask,
  BotTaskBase,
  BotTaskEngine,
  BotTaskEngineWithCoolDown,
  BotTaskWithCoolDown,
  IBotTaskEngine,
} from './botTaskEngine.js';

const isTaskWithCooldown = (task: BotTaskBase): task is BotTaskWithCoolDown =>
  (task as BotTaskWithCoolDown).coolDown !== undefined;

export class VillageBotTasksEngine {
  private readonly _tasks: readonly IBotTaskEngine[];

  constructor(
    village: Village,
    tasks: { new (village: Village): BotTask | BotTaskWithCoolDown }[],
  ) {
    this._tasks = tasks.map((Task) => {
      const task = new Task(village);

      if (isTaskWithCooldown(task)) {
        return new BotTaskEngineWithCoolDown(
          task,
          () =>
            AccountContext.getContext().nextExecutionService.getForVillage(
              village.id,
              task.type,
            ),
          (nextExecution) => {
            AccountContext.getContext().nextExecutionService.setForVillage(
              village.id,
              task.type,
              nextExecution,
            );
          },
        );
      }

      return new BotTaskEngine(task);
    });
  }

  public isExecutionReady = (): boolean =>
    this._tasks.some((t) => t.isExecutionReady());

  public execute = async (): Promise<void> => {
    for (const task of this._tasks) {
      await task.execute();
    }
  };
}
