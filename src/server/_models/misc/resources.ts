import { IResources } from '../../_types/graphql';
import { merge } from '../../../_shared/merge';
import {
  Fields,
  IComparable,
} from '../../../_shared/types';

const defaults: Fields<Resources> = {
  clay: 0,
  crop: 0,
  freeCrop: 0,
  iron: 0,
  wood: 0,
};

export class Resources implements IResources, IComparable<Resources> {
  public wood: number;
  public clay: number;
  public iron: number;
  public crop: number;
  public freeCrop: number;

  constructor(params: Partial<IResources> = {}) {
    Object.assign(this, merge(defaults, params));
  }

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
