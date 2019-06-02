import { IComparable } from '../../../../_shared/types/IComparable';
import { IResources } from '../../../../_shared/contract/models/IResources';

export class Resources implements IResources, IComparable<IResources> {
  readonly wood: number = 0;
  readonly clay: number = 0;
  readonly iron: number = 0;
  readonly crop: number = 0;

  constructor(params: Partial<IResources> = {}) {
    Object.assign(this, params);
  }

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
