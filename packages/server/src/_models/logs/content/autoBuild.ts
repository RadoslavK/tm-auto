import { BuildingType } from 'shared/enums/BuildingType.js';

export class AutoBuildLogEntryContent {
  public readonly fieldId: number = 0;

  public readonly level: number = 0;

  public readonly name: string = '';

  public readonly type: BuildingType = BuildingType.None;

  constructor(params: AutoBuildLogEntryContent) {
    Object.assign(this, params);
  }
}
