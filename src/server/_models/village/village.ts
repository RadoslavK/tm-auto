import { mergeDefaults } from '../../../_shared/merge';
import { PartialFields } from '../../../_shared/types/fields.type';
import { Buildings } from '../buildings';
import { Coords } from '../coords';
import { Units } from '../units';
import { VillageResources } from './villageResources';

export class Village {
  public readonly buildings: Buildings = new Buildings();
  public readonly coords: Coords = new Coords();
  public readonly id: number = 0;
  public isCapital: boolean = false;
  public name: string = '';
  public readonly units: Units = new Units();
  public readonly resources: VillageResources = new VillageResources();

  constructor(params: PartialFields<Village> = {}) {
    mergeDefaults(this, params);
  }

  public getWarehouseFullness = (): number =>
    this.resources.amount.getRequiredWarehouseSize() / this.resources.capacity.warehouse;

  public getGranaryFullness = (): number =>
    this.resources.amount.crop / this.resources.capacity.granary;
}