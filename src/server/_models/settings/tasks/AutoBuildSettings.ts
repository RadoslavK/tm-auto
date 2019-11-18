import { ITaskSettings } from '../../../_types/ITaskSettings';
import { CoolDown } from '../../coolDown';

interface IParams extends ITaskSettings {
  readonly autoCropFields: boolean;
  readonly minCrop: number;
}

export class AutoBuildSettings implements IParams {
  public allow = true;
  public coolDown: CoolDown = new CoolDown();

  readonly autoCropFields: boolean = false;
  readonly minCrop: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);

    if (this.coolDown instanceof CoolDown) {
      return;
    }

    this.coolDown = new CoolDown(this.coolDown);
  }
}
