import {
  IGameInfo,
  ITribe,
} from '../_types/graphql';
import { Fields } from '../../_shared/types';
import { merge } from '../../_shared/merge';

//  TODO has gold club feature

const defaults: Fields<GameInfo> = {
  speed: 0,
  tribe: ITribe.Romans,
  allyId: null,
};

export class GameInfo implements IGameInfo {
  public speed: number;
  public tribe: ITribe;
  public allyId: number | null;

  constructor(params: Partial<IGameInfo> = {}) {
    Object.assign(this, merge(defaults, params));
  }
}
