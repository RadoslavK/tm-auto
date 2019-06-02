import { IVillage } from '../../../../_shared/contract/models/IVillage';
import { ITypedRecord, TypedRecord } from '../../../../_shared/types/typedRecord';
import { IBuildingRecord } from './buildings/building';

interface IParams extends IVillage {
  readonly buildings: readonly IBuildingRecord[];
}

const defaultParams: IParams = {
  buildings: [],
  id: 0,
  name: '',
};

export interface IVillageRecord extends
  ITypedRecord<IParams>,
  IParams {
}

export class Village extends TypedRecord<IParams>(defaultParams) implements IVillageRecord {
  readonly id: number;
  readonly name: string;
  readonly buildings: readonly IBuildingRecord[];
}
