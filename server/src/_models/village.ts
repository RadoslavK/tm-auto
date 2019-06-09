import { Coords } from './coords';

interface IParams {
  coords: Coords;
  id: number;
  isCapital: boolean;
  name: string;
}

export class Village {
  public coords: Coords = new Coords();
  public id: number = 0;
  public isCapital: boolean = false;
  public name: string = '';

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
