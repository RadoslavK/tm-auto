import { ITaskSettings } from '../../../_types/ITaskSettings';
import { Cooldown } from '../../cooldown';

interface IParams extends ITaskSettings {
}

export class AutoBuildSettings implements IParams {
  public allow: boolean = true;
  public coolDown: Cooldown = new Cooldown();

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
