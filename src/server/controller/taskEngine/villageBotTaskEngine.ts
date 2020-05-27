import { Village } from '../../_models/village/village';
import { accountContext } from '../../accountContext';
import {
  BotTaskEngine,
  VillageBotTask,
} from './botTaskEngine';

export class VillageBotTasksEngine {
  private readonly _tasks: readonly BotTaskEngine[];

  constructor(village: Village, tasks: { new(village: Village): VillageBotTask }[]) {
    this._tasks = tasks.map(Task => {
      const task = new Task(village);

      return new BotTaskEngine(
        task,
        () => accountContext.nextExecutionService.getForVillage(village.id, task.type),
        nextExecution => {
          accountContext.nextExecutionService.setForVillage(village.id, task.type, nextExecution);
        },
      );
    });
  }

  public isExecutionReady = (): boolean => this._tasks.some(t => t.isExecutionReady());

  public execute = async (): Promise<void> => {
    for (const task of this._tasks) {
      await task.execute();
    }
  };
}