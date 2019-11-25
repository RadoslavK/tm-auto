import { Tribe } from '../_enums/Tribe';

//  TODO has gold club featury

interface IParams {
  speed: number;
  tribe: Tribe;
  allyId: number | null;
}

export class GameInfo implements IParams {
  public speed = 0;
  public tribe: Tribe = Tribe.None;
  public allyId: number | null = null;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
