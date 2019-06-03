import { BuildingLevel } from './buildingLevel';
import { BuildingType } from '../../enums/BuildingType';
import { IParsedBuilding } from '../../parsers/parseResourceFields';
import { IBuildingLevel } from './buildingLevel';

export interface IBuilding {
  level: IBuildingLevel;
  type: BuildingType;
}

export class Building implements IBuilding {
  level: IBuildingLevel = new BuildingLevel();
  type: BuildingType = BuildingType.None;

  constructor(params: Partial<IBuilding> = {}) {
    Object.assign(this, params);
  }

  static fromParsed = (building: IParsedBuilding): IBuilding => ({
    level: new BuildingLevel({ actual: building.level }),
    type: building.type,
  });
}
