import { IResources } from '../../_types/graphql';
import { merge } from '../../../_shared/merge';
import {
  Fields,
  IComparable,
} from '../../../_shared/types';

const getDefaults = (): Fields<Resources> => ({
  clay: 0,
  crop: 0,
  freeCrop: 0,
  iron: 0,
  wood: 0,
});

export class Resources implements IResources, IComparable<Resources> {
  public wood: number;
  public clay: number;
  public iron: number;
  public crop: number;
  public freeCrop: number;

  constructor(params: Partial<IResources> = {}) {
    Object.assign(this, merge(getDefaults, params));
  }

  public add = (addition: Resources): Resources => new Resources({
    clay: this.clay + addition.clay,
    crop: this.crop + addition.crop,
    freeCrop: this.freeCrop + addition.freeCrop,
    iron: this.iron + addition.iron,
    wood: this.wood + addition.wood,
  });

  public subtract = (subtraction: Resources): Resources => new Resources({
    clay: this.clay - subtraction.clay,
    crop: this.crop - subtraction.crop,
    freeCrop: this.freeCrop - subtraction.freeCrop,
    iron: this.iron - subtraction.iron,
    wood: this.wood - subtraction.wood,
  });

  public multiply = (multiplicator: number): Resources => new Resources({
    clay: this.clay * multiplicator,
    crop: this.crop * multiplicator,
    freeCrop: this.freeCrop * multiplicator,
    iron: this.iron * multiplicator,
    wood: this.wood * multiplicator,
  });

  public isGreaterOrEqualThan = (other: Resources): boolean =>
    this.wood >= other.wood
    && this.clay >= other.clay
    && this.iron >= other.iron
    && this.crop >= other.crop
    && this.freeCrop >= other.freeCrop;

  public isLowerThan = (other: Resources): boolean => !this.isGreaterOrEqualThan(other);

  public maxWarehouseRes = (): number => Math.max(this.wood, this.clay, this.iron);
}
