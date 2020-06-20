import { Village } from '../../_models/village/village';
import { getAccountContext } from '../../accountContext';
import {
  BotTask,
  BotTaskBase,
  BotTaskEngine,
  BotTaskEngineWithCoolDown,
  BotTaskWithCoolDown,
  IBotTaskEngine,
} from './botTaskEngine';

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
            getAccountContext().nextExecutionService.getForVillage(
              village.id,
              task.type,
            ),
          (nextExecution) => {
            getAccountContext().nextExecutionService.setForVillage(
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
