import { IComparable } from '../../../_shared/_types/IComparable';

export interface IResources {
  wood: number;
  clay: number;
  iron: number;
  crop: number;

  readonly isGreaterOrEqualThan: (other: IResources) => boolean;
  readonly isLowerThan: (other: IResources) => boolean;
}

export class Resources implements IResources, IComparable<IResources> {
  wood: number = 0;
  clay: number = 0;
  iron: number = 0;
  crop: number = 0;

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
