import { IBuildingLevel } from '../../../../../_shared/contract/models/buildings/IBuildingLevel';

export class BuildingLevel implements IBuildingLevel {
  readonly actual: number = 0;
  readonly ongoing: number = 0;

  constructor(params: Partial<IBuildingLevel> = {}) {
    Object.assign(this, params);
  }
}
