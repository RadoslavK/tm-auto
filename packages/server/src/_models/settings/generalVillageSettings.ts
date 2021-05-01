import { VillageTaskType } from 'shared/enums/TaskType.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class GeneralVillageSettings {
  public readonly allowTasks: boolean = true;

  public readonly tasksOrder: ReadonlyArray<VillageTaskType> = [
    VillageTaskType.AutoParty,
    VillageTaskType.AutoBuild,
    VillageTaskType.AutoUnits,
    VillageTaskType.AutoAcademy,
    VillageTaskType.AutoSmithy,
  ];

  constructor(params: PartialFields<GeneralVillageSettings> = {}) {
    mergeDefaults(this, params);
  }
}
