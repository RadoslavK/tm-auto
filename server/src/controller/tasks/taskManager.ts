import { TravianPath } from '../../_enums/TravianPath';
import { context } from '../../graphql/context';
import { Events } from '../../graphql/subscriptions/events';
import { pubSub } from '../../graphql/subscriptions/pubSub';
import { updateHeroInformation } from '../../parsers/hero/getHeroInformation';
import { getAllEnumValues } from '../../utils/enumUtils';
import { randomElement } from '../../utils/randomElement';
import { updateBuildings } from '../actions/build/updateBuildings';
import { ensurePage } from '../actions/ensurePage';
import { ensureVillageSelected } from '../actions/ensureVillageSelected';
import { updateResources } from '../actions/village/updateResources';
import { AutoAdventure } from './autoAdventure';
import { AutoBuild } from './autoBuild';

export class TaskManager {
  public execute = async (): Promise<void> => {
    await this.doGeneralTasks();
    await this.doVillageTasks();
    await this.doFinalTasks();
  };

  private doGeneralTasks = async (): Promise<void> => {
    await ensurePage(randomElement(getAllEnumValues(TravianPath)));
    await updateHeroInformation();

    const autoAdventure = new AutoAdventure();
    await autoAdventure.execute();
  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = context.villages.all();

    await villages.forEach(async (village) => {
      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();

      const autoBuild = new AutoBuild(village);
      await autoBuild.execute();
      await pubSub.publish(Events.BuildingsUpdated, null);
      await pubSub.publish(Events.VillageUpdated, null);
    });
  };

  private doFinalTasks = () => {

  };
}
