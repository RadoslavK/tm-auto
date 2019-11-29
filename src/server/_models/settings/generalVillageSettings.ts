import { IGeneralVillageSettings } from '../../_types/graphql';
import { merge } from '../../../_shared/merge';
import { Fields } from '../../../_shared/types';

const getDefaults = (): Fields<GeneralVillageSettings> => ({
  allowTasks: true,
});

export class GeneralVillageSettings implements IGeneralVillageSettings {
  public allowTasks: boolean;

  constructor(params: Partial<IGeneralVillageSettings> = {}) {
    Object.assign(this, merge(getDefaults, params));
  }
}
