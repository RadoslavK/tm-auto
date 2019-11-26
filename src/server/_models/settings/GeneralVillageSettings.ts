import { Fields } from '../../../_shared/types';
import { merge } from '../../../_shared/merge';

export interface IGeneralVillageSettingsParams {
  readonly allowTasks: boolean;
}

const defaults: Fields<GeneralVillageSettings> = {
  allowTasks: true,
};

export class GeneralVillageSettings implements IGeneralVillageSettingsParams {
  public allowTasks: boolean;

  constructor(params: Partial<IGeneralVillageSettingsParams> = {}) {
    Object.assign(this, merge(defaults, params));
  }
}
