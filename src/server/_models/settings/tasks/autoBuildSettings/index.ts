import { IAutoBuildSettings } from '../../../../_types/graphql';
import { merge } from '../../../../../_shared/merge';
import { Fields } from '../../../../../_shared/types';
import { CoolDown } from '../../../coolDown';
import { Duration } from '../../../duration';
import { AutoStorageSettings } from './autoStorageSettings';

const getDefaults = (): Fields<AutoBuildSettings> => ({
  allow: true,
  coolDown: new CoolDown({
    min: new Duration({ minutes: 4 }),
    max: new Duration({ minutes: 7 }),
  }),
  autoCropFields: false,
  minCrop: 0,
  autoStorage: new AutoStorageSettings(),
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
      coolDown: params.coolDown && new CoolDown(params.coolDown),
    }));
  }
}
