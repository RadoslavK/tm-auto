import { TravianPath } from '../_enums/travianPath';
import {
  publishEvent,
  publishPayloadEvent,
} from '../_graphql/pubSub';
import { getAllEnumValues } from '../../_shared/enumUtils';
import { accountContext } from '../accountContext';
import { BotEvent } from '../events/botEvent';
import { updateHeroInformation } from '../parsers/hero/updateHeroInformation';
import { randomElement } from '../utils/randomElement';
import { shuffle } from '../utils/shuffle';
import { updateBuildings } from './actions/buildings/updateBuildings';
import { ensurePage } from './actions/ensurePage';
import { ensureVillageSelected } from './actions/ensureVillageSelected';
import { updatePlayerInfo } from './actions/player/updatePlayerInfo';
import { updateNewOldVillages } from './actions/village/updateNewOldVillages';
import { updateResources } from './actions/village/updateResources';
import { BotTaskEngine } from './taskEngine/botTaskEngine';
import { VillageBotTasksEngine } from './taskEngine/villageBotTaskEngine';
import { AutoAdventureTask } from './villageTasks/autoAdventureTask';
import { AutoBuildTask } from './villageTasks/autoBuildTask';
import { AutoPartyTask } from './villageTasks/autoPartyTask';
import { AutoUnitsTask } from './villageTasks/autoUnitsTask';

export class TaskManager {
  private readonly _generalTasks: readonly BotTaskEngine[];
  //  special handling
  private readonly _autoAdventureTask: BotTaskEngine;
  private readonly _villageTasks: Record<number, VillageBotTasksEngine>;
  private readonly _finalTasks: readonly BotTaskEngine[];

  constructor() {
    this._generalTasks = [];
    this._finalTasks = [];
    this._villageTasks = {};

    const autoAdventureTask = new AutoAdventureTask();

    this._autoAdventureTask = new BotTaskEngine(
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

    for (const task of this._generalTasks) {
      await task.execute();
    }
  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = accountContext.villageService.allVillages();

    for (const village of shuffle(villages)) {
      if (!accountContext.settingsService.village(village.id).general.get().allowTasks) {
        continue;
      }

      let taskEngine = this._villageTasks[village.id];

      if (!taskEngine) {
        taskEngine = new VillageBotTasksEngine(village, [
          AutoPartyTask,
          AutoBuildTask,
          // Update resources - market
          AutoUnitsTask,
        ]);
        this._villageTasks[village.id] = taskEngine;
      }

      if (!this._autoAdventureTask.isExecutionReady() && !taskEngine.isExecutionReady()) {
        continue;
      }

      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();

      await this._autoAdventureTask.execute();

      await taskEngine.execute();

      await Promise.all([
        publishPayloadEvent(BotEvent.BuildingsUpdated, { villageId: village.id }),
        publishPayloadEvent(BotEvent.CrannyCapacityUpdated, { villageId: village.id }),
        publishEvent(BotEvent.VillageUpdated),
      ]);
    }
  };

  private doFinalTasks = async (): Promise<void> => {
    for (const task of this._finalTasks) {
      await task.execute();
    }
  };
}
