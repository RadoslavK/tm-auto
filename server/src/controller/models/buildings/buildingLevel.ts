import { IBuildingLevel } from '../../../../../_shared/contract/models/buildings/IBuildingLevel';
import { ITypedRecord, TypedRecord } from '../../../../../_shared/types/typedRecord';

const defaultParams: IBuildingLevel = {
  ongoing: 0,
  actual: 0,
};

export interface IBuildingLevelRecord extends
  ITypedRecord<IBuildingLevel>,
  IBuildingLevel {
}

export class BuildingLevel extends TypedRecord<IBuildingLevel>(defaultParams) implements IBuildingLevelRecord {
  readonly actual: number;
  readonly ongoing: number;
}
