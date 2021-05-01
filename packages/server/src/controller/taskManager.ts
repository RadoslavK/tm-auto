import { TaskType } from 'shared/enums/TaskType.js';
import { getAllEnumValues } from 'shared/utils/enumUtils.js';

import { TravianPath } from '../_enums/travianPath.js';
import { CoolDown } from '../_models/coolDown.js';
import { Duration } from '../_models/duration.js';
import { AccountContext } from '../accountContext.js';
import { BotEvent } from '../events/botEvent.js';
import { updateHeroInformation } from '../parsers/hero/updateHeroInformation.js';
import { publishPayloadEvent } from '../pubSub.js';
import { randomElement } from '../utils/randomElement.js';
import { shuffle } from '../utils/shuffle.js';
import { updateBuildings } from './actions/buildings/updateBuildings.js';
import { ensurePage } from './actions/ensurePage.js';
import { ensureVillageSelected } from './actions/ensureVillageSelected.js';
import { collectDailyRewards } from './actions/mentor/collectDailyRewards.js';
import { collectTaskRewards } from './actions/mentor/collectTaskRewards.js';
import { updateCapitalAndAlly } from './actions/player/updateCapitalAndAlly.js';
import { updateNewOldVillages } from './actions/village/updateNewOldVillages.js';
import { updateResources } from './actions/village/updateResources.js';
import {
  BotTaskEngineWithCoolDown,
  IBotTaskEngine,
} from './taskEngine/botTaskEngine.js';
import { VillageBotTasksEngine } from './taskEngine/villageBotTaskEngine.js';
import { AutoAdventureTask } from './tasks/autoAdventureTask.js';
import { AutoAcademyTask } from './tasks/village/autoAcademyTask.js';
import { AutoBuildTask } from './tasks/village/autoBuildTask';
import { AutoPartyTask } from './tasks/village/autoPartyTask.js';
import { AutoSmithyTask } from './tasks/village/autoSmithyTask.js';
import { AutoUnitsTask } from './tasks/village/autoUnitsTask.js';

const generalTasksCoolDown = new CoolDown({
  min: new Duration({ minutes: 1 }),
  max: new Duration({ minutes: 10 }),
});

export class TaskManager {
  private readonly _generalTasks: readonly IBotTaskEngine[];

  private readonly _villageTasks: Record<string, VillageBotTasksEngine>;

  private readonly _finalTasks: readonly IBotTaskEngine[];

  constructor() {
    this._generalTasks = [
      new BotTaskEngineWithCoolDown({
        task: new AutoAdventureTask(),
        getNextExecution: () =>
          AccountContext.getContext().nextExecutionService.get(TaskType.AutoAdventure),
        setNextExecution: (nextExecution) =>
          AccountContext.getContext().nextExecutionService.set(
            TaskType.AutoAdventure,
            nextExecution,
          ),
      }),
      new BotTaskEngineWithCoolDown({
        task: {
          allowExecution: () => true,
          coolDown: () => generalTasksCoolDown,
          execute: async () => {
            await ensurePage(
              randomElement(
                getAllEnumValues(TravianPath).filter(
                  (x) => ![TravianPath.Logout, TravianPath.AccountOverview].includes(x),
                ),
              ),
            );
            await updateNewOldVillages();
            await updateHeroInformation();
            await updateCapitalAndAlly();
            await collectDailyRewards();
          },
          type: TaskType.General,
        },
        getNextExecution: () =>
          AccountContext.getContext().nextExecutionService.get(TaskType.General),
        setNextExecution: (nextExecution) =>
          AccountContext.getContext().nextExecutionService.set(
            TaskType.General,
            nextExecution,
          ),
      }),
    ];

    this._finalTasks = [];
    this._villageTasks = {};
  }

  public execute = async (): Promise<void> => {
    if (!AccountContext.getContext().settingsService.account.get().allowTasks) {
      return;
    }

    await this.doGeneralTasks();
    await this.doVillageTasks();
    await this.doFinalTasks();
  };

  private doGeneralTasks = async (): Promise<void> => {
    for (const task of this._generalTasks) {
      if (task.isExecutionReady()) {
        await task.execute();
      }
    }
  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = AccountContext.getContext().villageService.allVillages();
    const scannedVillages = shuffle(villages.filter(v => v.scanned));
    const notScannedVillages = shuffle(villages.filter(v => !v.scanned));

    //  Scan not scanned villages first
    for (const village of notScannedVillages.concat(scannedVillages)) {
      if (!village.scanned) {
        //  New village, should always scan and it will get here because new village allows task by default
        await ensureVillageSelected(village.id);
        await collectTaskRewards();
        await updateResources();
        await updateBuildings();

        village.scanned = true;
        await AccountContext.getContext().villageService.serialize([village.id]);

        publishPayloadEvent(BotEvent.VillageUpdated, { village });
      }

      if (
        !AccountContext.getContext().settingsService.village(village.id).general.get().allowTasks
      ) {
        continue;
      }

      let taskEngine = this._villageTasks[village.id];

      if (!taskEngine) {
        taskEngine = new VillageBotTasksEngine(village, [
          AutoPartyTask,
          AutoBuildTask,
          AutoUnitsTask,
          AutoAcademyTask,
          AutoSmithyTask,
        ]);

        this._villageTasks[village.id] = taskEngine;
      }

      if (!taskEngine.isExecutionReady()) {
        continue;
      }

      await ensureVillageSelected(village.id);
      await collectTaskRewards();
      await updateResources();
      await updateBuildings();
      await taskEngine.execute();

      publishPayloadEvent(BotEvent.VillageUpdated, { village });
    }
  };

  private doFinalTasks = async (): Promise<void> => {
    for (const task of this._finalTasks) {
      await task.execute();
    }
  };
}
