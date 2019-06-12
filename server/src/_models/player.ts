import { Tribe } from '../_enums/Tribe';

interface IParams {
  speed: number;
  tribe: Tribe;
}

export class Player implements IParams {
  public speed: number = 0;
  public tribe: Tribe = Tribe.None;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
