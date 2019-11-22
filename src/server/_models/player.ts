import { Tribe } from '../_enums/Tribe';

//  TODO ally id + has gold club featury

interface IParams {
  speed: number;
  tribe: Tribe;
}

export class Player implements IParams {
  public speed = 0;
  public tribe: Tribe = Tribe.None;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
