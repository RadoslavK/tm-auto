import { ITaskSettingsParams } from '../../../_types/ITaskSettingsParams';
import { CoolDown } from '../../coolDown';
import { Duration } from '../../duration';
import { Fields } from '../../../../_shared/types';
import { merge } from '../../../../_shared/merge';

export interface IAutoBuildSettingsParams extends ITaskSettingsParams {
  readonly autoCropFields: boolean;
  readonly minCrop: number;
}

const defaults: Fields<AutoBuildSettings> = {
  allow: true,
  coolDown: new CoolDown({
    min: new Duration({ minutes: 4 }),
    max: new Duration({ minutes: 7 }),
  }),
  autoCropFields: false,
  minCrop: 0,
};

export class AutoBuildSettings implements IAutoBuildSettingsParams {
  public allow: boolean;
  public coolDown: CoolDown;

  readonly autoCropFields: boolean;
  readonly minCrop: number;

  constructor(params: Partial<IAutoBuildSettingsParams> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      coolDown: params.coolDown && new CoolDown(params.coolDown),
    }));
  }
}
