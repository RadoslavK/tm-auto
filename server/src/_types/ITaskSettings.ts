import { Cooldown } from '../_models/cooldown';

export interface ITaskSettings {
  allow: boolean;
  coolDown: Cooldown;
}
