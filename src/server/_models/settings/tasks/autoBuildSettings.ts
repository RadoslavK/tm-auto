import { IAutoBuildSettings } from '../../../_types/graphql';
import { merge } from '../../../../_shared/merge';
import { Fields } from '../../../../_shared/types';
import { CoolDown } from '../../coolDown';
import { Duration } from '../../duration';

const defaults: Fields<AutoBuildSettings> = {
  allow: true,
  coolDown: new CoolDown({
    min: new Duration({ minutes: 4 }),
    max: new Duration({ minutes: 7 }),
  }),
  autoCropFields: false,
  minCrop: 0,
};

export class AutoBuildSettings implements IAutoBuildSettings {
  public allow: boolean;
  public coolDown: CoolDown;

  readonly autoCropFields: boolean;
  readonly minCrop: number;

  constructor(params: Partial<IAutoBuildSettings> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      coolDown: params.coolDown && new CoolDown(params.coolDown),
    }));
  }
}
