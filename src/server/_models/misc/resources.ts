import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';

export class Resources {
  public readonly clay: number = 0;
  public readonly crop: number = 0;
  public readonly freeCrop: number = 0;
  public readonly iron: number = 0;
  public readonly wood: number = 0;

  constructor(params: PartialFields<Resources> = {}) {
    mergeDefaults(this, params);
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

  public getRequiredWarehouseSize = (): number =>
    Math.max(this.wood, this.clay, this.iron);

  public areGreaterOrEqualThan = (other: Resources): boolean =>
    this.wood >= other.wood
    && this.clay >= other.clay
    && this.iron >= other.iron
    && this.crop >= other.crop
    && this.freeCrop >= other.freeCrop;

  public areLowerThan = (other: Resources): boolean =>
    !this.areGreaterOrEqualThan(other);

  public getTotal = (): number =>
    this.wood + this.clay + this.iron + this.crop;
}