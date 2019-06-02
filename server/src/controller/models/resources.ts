import { IComparable } from '../../../../_shared/types/IComparable';
import { IResources } from '../../../../_shared/contract/models/IResources';
import { ITypedRecord, TypedRecord } from '../../../../_shared/types/typedRecord';

const defaultParams: IResources = {
  wood: 0,
  iron: 0,
  clay: 0,
  crop: 0,
};

interface IResourcesRecord extends
  ITypedRecord<IResources>,
  IResources,
  IComparable<IResources> {
}

export class Resources extends TypedRecord<IResources>(defaultParams) implements IResourcesRecord {
  readonly wood: number;
  readonly clay: number;
  readonly iron: number;
  readonly crop: number;

  isGreaterOrEqualThan(other: IResources): boolean {
    return this.wood >= other.wood
      && this.clay >= other.clay
      && this.iron >= other.iron
      && this.crop >= other.crop;
  }

  isLowerThan(other: IResources): boolean {
    return !this.isGreaterOrEqualThan(other);
  }
}
