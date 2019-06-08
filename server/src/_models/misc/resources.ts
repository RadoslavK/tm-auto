import { IComparable } from '../../../../_shared/_types/IComparable';

interface IParams {
  wood: number;
  clay: number;
  iron: number;
  crop: number;
}

export class Resources implements IParams, IComparable<IParams> {
  wood: number = 0;
  clay: number = 0;
  iron: number = 0;
  crop: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public add(addition: Resources) {
    this.wood += addition.wood;
    this.clay += addition.clay;
    this.iron += addition.iron;
    this.crop += addition.crop;
  }

  public total() {
    return this.wood + this.clay + this.iron + this.crop;
  }

  isGreaterOrEqualThan(other: Resources): boolean {
    return this.wood >= other.wood
      && this.clay >= other.clay
      && this.iron >= other.iron
      && this.crop >= other.crop;
  }

  isLowerThan(other: Resources): boolean {
    return !this.isGreaterOrEqualThan(other);
  }
}