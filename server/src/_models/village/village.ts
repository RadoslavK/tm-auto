import { Coords } from '../coords';
import { VillageResources } from './villageResources';

interface IParams {
  coords: Coords;
  id: number;
  isCapital: boolean;
  name: string;
  resources: VillageResources;
}

export class Village implements IParams {
  public coords: Coords = new Coords();
  public id: number = 0;
  public isCapital: boolean = false;
  public name: string = '';
  public resources: VillageResources = new VillageResources();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
