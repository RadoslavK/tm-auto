import { IBuildingLevel } from '../../_types/graphql';

export class BuildingLevel implements IBuildingLevel {
  actual: number = 0;
  ongoing: number = 0;

  constructor(params: Partial<IBuildingLevel> = {}) {
    Object.assign(this, params);
  }
}
