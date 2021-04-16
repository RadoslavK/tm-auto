import { BuildingType } from 'shared/enums/BuildingType.js';
import { TaskType } from 'shared/enums/TaskType.js';

import type { CoolDown } from '../../../_models/coolDown.js';
import type { AutoSmithySettings } from '../../../_models/settings/tasks/autoSmithySettings.js';
import type { Village } from '../../../_models/village/village.js';
import { getPage } from '../../../browser/getPage.js';
import { ensureBuildingSpotPage } from '../../actions/ensurePage.js';
import type {
  BotTaskWithCoolDown,
  BotTaskWithCoolDownResult,
} from '../../taskEngine/botTaskEngine.js';

export class AutoSmithyTask implements BotTaskWithCoolDown {
  readonly type: TaskType = TaskType.AutoSmithy;

  private settings = (): AutoSmithySettings => null as any;

  public allowExecution = (): boolean => this.settings().allow;

  public coolDown = (): CoolDown => this.settings().coolDown;

  constructor(private village: Village) {
  }

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    const smithy = this.village.buildings.spots.ofType(BuildingType.Smithy);

    if (!smithy?.level.actual) {
      return;
    }

    await ensureBuildingSpotPage(smithy.fieldId);

    const page = await getPage();
    const settings = this.settings();
  };
}