import { IComparable } from '../../../_shared/types';

interface IParams {
  wood: number;
  clay: number;
  iron: number;
  crop: number;
  freeCrop: number;
}

export class Resources implements IParams, IComparable<Resources> {
  public wood = 0;
  public clay = 0;
  public iron = 0;
  public crop = 0;
  public freeCrop = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public total = (): number => this.wood + this.clay + this.iron + this.crop;

  public add = (addition: Resources): Resources => {
    return new Resources({
      wood: this.wood + addition.wood,
      clay: this.clay + addition.clay,
      iron: this.iron + addition.iron,
      crop: this.crop + addition.crop,
      freeCrop: this.freeCrop + addition.freeCrop,
    });
  };

  public subtract = (subtraction: Resources): Resources => {
    return new Resources({
      wood: this.wood - subtraction.wood,
      clay: this.clay - subtraction.clay,
      iron: this.iron - subtraction.iron,
      crop: this.crop - subtraction.crop,
      freeCrop: this.freeCrop - subtraction.freeCrop,
    });
  };

  public multiply = (multiplicator: number): Resources => {
    return new Resources({
      wood: this.wood * multiplicator,
      clay: this.clay * multiplicator,
      iron: this.iron * multiplicator,
      crop: this.crop * multiplicator,
      freeCrop: this.freeCrop * multiplicator,
    });
  };

  public isGreaterOrEqualThan = (other: Resources): boolean =>
    this.wood >= other.wood
    && this.clay >= other.clay
    && this.iron >= other.iron
    && this.crop >= other.crop
    && this.freeCrop >= other.freeCrop;

  public isLowerThan = (other: Resources): boolean => !this.isGreaterOrEqualThan(other);
}
