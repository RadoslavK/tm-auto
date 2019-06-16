import { ITaskSettings } from '../../../_types/ITaskSettings';
import { Cooldown } from '../../cooldown';

interface IParams extends ITaskSettings {
  readonly autoCropFields: boolean;
  readonly minCrop: number;
}

export class AutoBuildSettings implements IParams {
  public allow: boolean = true;
  public coolDown: Cooldown = new Cooldown();

  readonly autoCropFields: boolean = false;
  readonly minCrop: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);

    if (this.coolDown instanceof Cooldown) {
      return;
    }

    this.coolDown = new Cooldown(this.coolDown);
  }
}
