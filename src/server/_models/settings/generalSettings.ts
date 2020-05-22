import { IGeneralSettings } from '../../_types/graphql';
import { merge } from '../../../_shared/merge';
import { Fields } from '../../../_shared/types';

const getDefaults = (): Fields<GeneralSettings> => ({
  allowTasks: true,
  autoBuild: true,
  autoParty: true,
  autoStart: false,
  autoUnits: true,
});

export class GeneralSettings implements IGeneralSettings {
  public allowTasks: boolean;
  public autoBuild: boolean;
  public autoUnits: boolean;
  public autoStart: boolean;
  public autoParty: boolean;

  constructor(params: Partial<IGeneralSettings> = {}) {
    Object.assign(this, merge(getDefaults, params));
  }
}
