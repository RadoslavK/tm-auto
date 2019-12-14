import {
  IAutoStorageOptionSettings,
  IAutoStorageSettings,
} from '../../../../_types/graphql';
import { merge } from '../../../../../_shared/merge';
import { Fields } from '../../../../../_shared/types';

const getOptionDefaults = (): Fields<AutoStorageOptionSettings> => ({
  allow: false,
  overflowLevel: 95,
});

class AutoStorageOptionSettings implements IAutoStorageOptionSettings {
  public readonly allow: boolean;
  public readonly overflowLevel: number;

  constructor(params: Partial<IAutoStorageOptionSettings> = {}) {
    Object.assign(this, merge(getOptionDefaults, params));
  }
}

const getDefaults = (): Fields<AutoStorageSettings> => ({
  allowFreeSpots: false,
  granary: new AutoStorageOptionSettings(),
  warehouse: new AutoStorageOptionSettings(),
});

export class AutoStorageSettings implements IAutoStorageSettings {
  public readonly allowFreeSpots: boolean;
  public readonly granary: AutoStorageOptionSettings;
  public readonly warehouse: AutoStorageOptionSettings;

  constructor(params: Partial<IAutoStorageSettings> = {}) {
    Object.assign(this, merge(getDefaults, params));
  }
}
