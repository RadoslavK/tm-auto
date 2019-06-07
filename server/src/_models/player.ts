import { Tribe } from '../_enums/Tribe';

interface IParams {
  speed: number;
  tribe: Tribe;
}

export class Player implements IParams {
  speed: number = 0;
  tribe: Tribe = Tribe.None;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
