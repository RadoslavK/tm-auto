import { Buildings } from '../buildings';
import { Coords } from '../coords';
import { Units } from '../units';
import { VillageResources } from './villageResources';

interface IParams {
  readonly buildings: Buildings;
  coords: Coords;
  id: number;
  isCapital: boolean;
  name: string;
  readonly resources: VillageResources;
}

export class Village implements IParams {
  public readonly buildings: Buildings = new Buildings();
  public readonly units: Units = new Units();
  public coords: Coords = new Coords();
  public id: number = 0;
  public isCapital: boolean = false;
  public name: string = '';
  public readonly resources: VillageResources = new VillageResources();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
