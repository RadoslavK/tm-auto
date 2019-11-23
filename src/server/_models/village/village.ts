import { Buildings } from '../buildings';
import { Coords } from '../coords';
import { Units } from '../units';
import { VillageResources } from './villageResources';

interface IParams {
  readonly buildings: Buildings;
  readonly units: Units;
  readonly resources: VillageResources;
  coords: Coords;
  id: number;
  isCapital: boolean;
  name: string;
}

export class Village implements IParams {
  public readonly buildings: Buildings = new Buildings();
  public readonly units: Units = new Units();
  public coords: Coords = new Coords();
  public id = 0;
  public isCapital = false;
  // TODO dynamically update
  public name = '';
  public readonly resources: VillageResources = new VillageResources();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
