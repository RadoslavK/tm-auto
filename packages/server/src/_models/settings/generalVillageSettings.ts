import { TaskType } from 'shared/enums/TaskType.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

export class GeneralVillageSettings {
  public readonly allowTasks: boolean = true;

  public readonly tasksOrder: ReadonlyArray<TaskType> = [
    TaskType.AutoParty,
    TaskType.AutoBuild,
    TaskType.AutoUnits,
    TaskType.AutoAcademy,
    TaskType.AutoSmithy,
  ];

  constructor(params: PartialFields<GeneralVillageSettings> = {}) {
    mergeDefaults(this, params);
  }
}
