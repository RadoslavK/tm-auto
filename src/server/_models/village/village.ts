import { IVillage } from '../../_types/graphql';
import { merge } from '../../../_shared/merge';
import { Fields } from '../../../_shared/types';
import { Buildings } from '../buildings';
import { Coords } from '../coords';
import { Units } from '../units';
import { VillageResources } from './villageResources';

const getDefaults = (): Fields<Village> => ({
  buildings: new Buildings(),
  coords: new Coords(),
  id: 0,
  isCapital: false,
  name: '',
  resources: new VillageResources(),
  units: new Units(),
});

export class Village implements IVillage {
  public buildings: Buildings;
  public units: Units;
  public coords: Coords;
  public id: number;
  public isCapital: boolean;
  // TODO dynamically update
  public name: string;
  public resources: VillageResources;

  constructor(params: Partial<IVillage> = {}) {
    Object.assign(this, merge(getDefaults, {
      ...params,
      resources: params.resources && new VillageResources(params.resources),
    }));
  }
}
