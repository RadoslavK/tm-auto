import { context } from '../../graphql/context';
import { updateBuildings } from '../actions/build/updateBuildings';
import { ensureVillageSelected } from '../actions/ensureVillageSelected';
import { updateResources } from '../actions/village/updateResources';

export class TaskManager {
  public execute = async (): Promise<void> => {
    await this.doGeneralTasks();
    await this.doVillageTasks();
    await this.doFinalTasks();
  };

  private doGeneralTasks = () => {

  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = context.villages.all();

    await villages.forEach(async (village) => {
      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();
    });
  };

  private doFinalTasks = () => {

  };
}
