interface IParams {
  x: number;
  y: number;
}

export class Coords implements IParams {
  public x = 0;
  public y = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public toString = (): string => `[${this.x}|${this.y}]`;
}
