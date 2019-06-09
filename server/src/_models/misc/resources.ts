import { IComparable } from '../../../../_shared/_types/IComparable';

interface IParams {
  wood: number;
  clay: number;
  iron: number;
  crop: number;
  freeCrop: number;
}

export class Resources implements IComparable<Resources> {
  public wood: number = 0;
  public clay: number = 0;
  public iron: number = 0;
  public crop: number = 0;
  public freeCrop: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public add = (addition: Resources): void => {
    this.wood += addition.wood;
    this.clay += addition.clay;
    this.iron += addition.iron;
    this.crop += addition.crop;
    this.freeCrop += addition.freeCrop;
  };

  public total = (): number => this.wood + this.clay + this.iron + this.crop;

  public isGreaterOrEqualThan = (other: Resources): boolean =>
    this.wood >= other.wood
    && this.clay >= other.clay
    && this.iron >= other.iron
    && this.crop >= other.crop
    && this.freeCrop >= other.freeCrop;

  public isLowerThan = (other: Resources): boolean => !this.isGreaterOrEqualThan(other)
}
