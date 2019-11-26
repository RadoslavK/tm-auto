import {
  ICoolDownParams,
} from '../_models/coolDown';

export interface ITaskSettingsParams {
  readonly allow: boolean;
  readonly coolDown: ICoolDownParams;
}
