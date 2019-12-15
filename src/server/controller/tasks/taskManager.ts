import { getAllEnumValues } from '../../../_shared/enumUtils';
import { TravianPath } from '../../_enums/travianPath';
import { Village } from '../../_models/village/village';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../../graphql/subscriptions/botEvent';
import {
  publishEvent,
  publishPayloadEvent,
} from '../../graphql/subscriptions/pubSub';
import { updateHeroInformation } from '../../parsers/hero/updateHeroInformation';
import { randomElement } from '../../utils/randomElement';
import { shuffle } from '../../utils/shuffle';
import { updateBuildings } from '../actions/buildings/updateBuildings';
import { ensurePage } from '../actions/ensurePage';
import { ensureVillageSelected } from '../actions/ensureVillageSelected';
import { updatePlayerInfo } from '../actions/player/updatePlayerInfo';
import { updateNewOldVillages } from '../actions/village/updateNewOldVillages';
import { updateResources } from '../actions/village/updateResources';
import {
  IBotTask,
  IVillageBotTask,
} from './_types';
import { AutoAdventureTask } from './village/autoAdventureTask';
import { AutoBuildTask } from './village/autoBuildTask';
import { AutoPartyTask } from './village/autoPartyTask';
import { AutoUnitsTask } from './village/autoUnitsTask';

class BotTaskEngine {
  private readonly m_task: IBotTask | IVillageBotTask;
  private readonly m_setNextExecution: (nextExecution: Date) => void;

  private readonly getNextExecution: () => Date;

  constructor(task: IBotTask | IVillageBotTask, getNextExecution: () => Date, setNextExecution: (nextExecution: Date) => void) {
    this.m_task = task;
    this.m_setNextExecution = setNextExecution;
    this.getNextExecution = getNextExecution;
  }

  public isExecutionReady = (): boolean => this.m_task.allowExecution()
    && this.getNextExecution() < new Date();

  public execute = async (): Promise<void> => {
    if (!this.isExecutionReady()) {
      return;
    }

    const timeOfStart = new Date();
    const result = await this.m_task.execute();

    const coolDown = result && result.nextCoolDown
      ? result.nextCoolDown.getMin(this.m_task.coolDown())
      : this.m_task.coolDown();

    const delay = coolDown.randomDelay();

    const timeOfNextExecution = timeOfStart;
    timeOfNextExecution.setSeconds(timeOfNextExecution.getSeconds() + delay);

    this.m_setNextExecution(timeOfNextExecution);
  }
}

class VillageBotTasksEngine {
  private readonly m_tasks: readonly BotTaskEngine[];

  constructor(village: Village, tasks: { new(village: Village): IVillageBotTask }[]) {
    this.m_tasks = tasks.map(Task => {
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

  public isExecutionReady = (): boolean => this.m_tasks.some(t => t.isExecutionReady());

  public execute = async (): Promise<void> => {
    for (const task of this.m_tasks) {
      await task.execute();
    }
  };
}

export class TaskManager {
  private readonly m_generalTasks: readonly BotTaskEngine[];
  //  special handling
  private readonly m_autoAdventureTask: BotTaskEngine;
  private readonly m_villageTasks: Record<number, VillageBotTasksEngine>;
  private readonly m_finalTasks: readonly BotTaskEngine[];

  constructor() {
    this.m_generalTasks = [];
    this.m_finalTasks = [];
    this.m_villageTasks = {};

    const autoAdventureTask = new AutoAdventureTask();

    this.m_autoAdventureTask = new BotTaskEngine(
      autoAdventureTask,
      () => accountContext.nextExecutionService.get(autoAdventureTask.type),
      nextExecution => {
        accountContext.nextExecutionService.set(autoAdventureTask.type, nextExecution);
      },
    );
  }

  public execute = async (): Promise<void> => {
    if (!accountContext.settingsService.general.get().allowTasks) {
      return;
    }

    await this.doGeneralTasks();
    await this.doVillageTasks();
    await this.doFinalTasks();
  };

  private doGeneralTasks = async (): Promise<void> => {
    await ensurePage(randomElement(getAllEnumValues(TravianPath)));
    await updateNewOldVillages();
    await updateHeroInformation();
    await updatePlayerInfo();

    for (const task of this.m_generalTasks) {
      await task.execute();
    }
  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = accountContext.villageService.allVillages();

    for (const village of shuffle(villages)) {
      if (!accountContext.settingsService.village(village.id).general.get().allowTasks) {
        continue;
      }

      let taskEngine = this.m_villageTasks[village.id];

      if (!taskEngine) {
        taskEngine = new VillageBotTasksEngine(village, [
          AutoPartyTask,
          AutoBuildTask,
          // Update resources - market
          AutoUnitsTask,
        ]);
        this.m_villageTasks[village.id] = taskEngine;
      }

      if (!this.m_autoAdventureTask.isExecutionReady() && !taskEngine.isExecutionReady()) {
        continue;
      }

      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();

      await this.m_autoAdventureTask.execute();

      await taskEngine.execute();

      await Promise.all([
        publishPayloadEvent(BotEvent.BuildingsUpdated, { villageId: village.id }),
        publishPayloadEvent(BotEvent.CrannyCapacityUpdated, { villageId: village.id }),
        publishEvent(BotEvent.VillageUpdated),
      ]);
    }
  };

  private doFinalTasks = async (): Promise<void> => {
    for (const task of this.m_finalTasks) {
      await task.execute();
    }
  };
}
