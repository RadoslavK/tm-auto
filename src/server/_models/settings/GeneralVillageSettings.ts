import { Fields } from '../../../_shared/types';
import { merge } from '../../../_shared/merge';
import { IGeneralVillageSettings } from '../../_types/graphql';

const defaults: Fields<GeneralVillageSettings> = {
  allowTasks: true,
};

export class GeneralVillageSettings implements IGeneralVillageSettings {
  public allowTasks: boolean;

  constructor(params: Partial<IGeneralVillageSettings> = {}) {
    Object.assign(this, merge(defaults, params));
  }
}
