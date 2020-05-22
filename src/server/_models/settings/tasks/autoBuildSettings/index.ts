import { IAutoBuildSettings } from '../../../../_types/graphql';
import { merge } from '../../../../../_shared/merge';
import { Fields } from '../../../../../_shared/types';
import { CoolDown } from '../../../coolDown';
import { Duration } from '../../../duration';
import { AutoStorageSettings } from './autoStorageSettings';

const getDefaults = (): Fields<AutoBuildSettings> => ({
  allow: true,
  autoCropFields: false,
  autoStorage: new AutoStorageSettings(),
  coolDown: new CoolDown({
    max: new Duration({ minutes: 7 }),
    min: new Duration({ minutes: 4 }),
  }),
  minCrop: 0,
});

export class AutoBuildSettings implements IAutoBuildSettings {
  public readonly allow: boolean;
  public readonly coolDown: CoolDown;

  public readonly autoCropFields: boolean;
  public readonly minCrop: number;

  public readonly autoStorage: AutoStorageSettings;

  constructor(params: Partial<IAutoBuildSettings> = {}) {
    Object.assign(this, merge(getDefaults, {
      ...params,
      autoStorage: params.autoStorage && new AutoStorageSettings(params.autoStorage),
      coolDown: params.coolDown && new CoolDown(params.coolDown),
    }));
  }
}
