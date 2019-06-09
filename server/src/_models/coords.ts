interface IParams {
  x: number;
  y: number;
}

export class Coords {
  public x: number = 0;
  public y: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
