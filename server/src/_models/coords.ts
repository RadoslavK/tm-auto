interface IParams {
  x: number;
  y: number;
}

export class Coords implements IParams {
  public x: number = 0;
  public y: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
