import { BuildingLevel } from './buildingLevel';
import { BuildingType } from '../../../../../_shared/contract/enums/BuildingType';
import { IParsedBuilding } from '../../parsers/parseResourceFields';
import { IBuilding } from '../../../../../_shared/contract/models/buildings/IBuilding';
import { IBuildingLevel } from '../../../../../_shared/contract/models/buildings/IBuildingLevel';

export class Building implements IBuilding {
  readonly level: IBuildingLevel = new BuildingLevel();
  readonly type: BuildingType = BuildingType.None;

  constructor(params: Partial<IBuilding> = {}) {
    Object.assign(this, params);
  }

  static fromParsed = (building: IParsedBuilding): IBuilding => ({
    level: new BuildingLevel({ actual: building.level }),
    type: building.type,
  });
}
