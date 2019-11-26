import { Fields } from '../../../_shared/types';
import { merge } from '../../../_shared/merge';

export interface IGeneralSettingsParams {
  readonly allowTasks: boolean;
  readonly autoBuild: boolean;
  readonly autoUnits: boolean;
}

const defaults: Fields<GeneralSettings> = {
  autoUnits: true,
  autoBuild: true,
  allowTasks: true,
};

export class GeneralSettings implements IGeneralSettingsParams {
  allowTasks: boolean;
  autoBuild: boolean;
  autoUnits: boolean;

  constructor(params: Partial<IGeneralSettingsParams> = {}) {
    Object.assign(this, merge(defaults, params));
  }
}
