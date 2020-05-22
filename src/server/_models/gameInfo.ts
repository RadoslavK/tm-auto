import { merge } from '../../_shared/merge';
import { Fields } from '../../_shared/types';
import { Tribe } from '../../_shared/types/tribe';

//  TODO has gold club feature

const getDefaults = (): Fields<GameInfo> => ({
  allyId: null,
  speed: 0,
  tribe: Tribe.Romans,
});

export class GameInfo {
  public speed: number;
  public tribe: Tribe;
  public allyId: number | null;

  constructor(params: Partial<Fields<GameInfo>> = {}) {
    Object.assign(this, merge(getDefaults, params));
  }
}
