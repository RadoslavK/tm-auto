import { IGeneralSettings } from '../../_types/graphql';
import { merge } from '../../../_shared/merge';
import { Fields } from '../../../_shared/types';

const defaults: Fields<GeneralSettings> = {
  autoUnits: true,
  autoBuild: true,
  allowTasks: true,
};

export class GeneralSettings implements IGeneralSettings {
  public allowTasks: boolean;
  public autoBuild: boolean;
  public autoUnits: boolean;

  constructor(params: Partial<IGeneralSettings> = {}) {
    Object.assign(this, merge(defaults, params));
  }
}