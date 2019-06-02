interface IParams {
  readonly actual: number;
  readonly ongoing: number;
}

export interface IBuildingLevel extends IParams {
  readonly total: () => number;
}

export class BuildingLevel implements IBuildingLevel {
  readonly actual: number = 0;
  readonly ongoing: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public total(): number {
    return this.actual + this.ongoing;
  }
}
