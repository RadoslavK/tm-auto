import { IBuilding } from '../../_types/graphql';
import { BuildingLevel } from './buildingLevel';
import { BuildingType } from '../../_enums/BuildingType';
import { IParsedBuilding } from '../../controller/parsers/parseResourceFields';

export class Building implements IBuilding {
  level: BuildingLevel = new BuildingLevel();
  type: BuildingType = BuildingType.None;

  constructor(params: Partial<IBuilding> = {}) {
    Object.assign(this, params);
  }

  static fromParsed = (building: IParsedBuilding): Building => ({
    level: new BuildingLevel({ actual: building.level }),
    type: building.type,
  });
}
