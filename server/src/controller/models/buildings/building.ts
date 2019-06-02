import { BuildingLevel, IBuildingLevelRecord } from './buildingLevel';
import { BuildingType } from '../../../../../_shared/contract/enums/BuildingType';
import { IParsedBuilding } from '../../parsers/parseResourceFields';
import { IBuilding } from '../../../../../_shared/contract/models/buildings/IBuilding';
import { ITypedRecord, TypedRecord } from '../../../../../_shared/types/typedRecord';

interface IParams extends IBuilding {
  readonly level: IBuildingLevelRecord;
}

const defaultParams: IParams = {
  type: BuildingType.None,
  level: new BuildingLevel(),
};

export interface IBuildingRecord extends
  ITypedRecord<IParams>,
  IParams {
}

export class Building extends TypedRecord<IParams>(defaultParams) implements IBuildingRecord {
  readonly level: IBuildingLevelRecord;
  readonly type: BuildingType;

  static fromParsed = (building: IParsedBuilding): IBuildingRecord => new Building({
    level: new BuildingLevel({ actual: building.level }),
    type: building.type,
  });
}
