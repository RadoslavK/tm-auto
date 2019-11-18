import { CoolDown } from '../_models/coolDown';

export interface ITaskSettings {
  allow: boolean;
  coolDown: CoolDown;
}
