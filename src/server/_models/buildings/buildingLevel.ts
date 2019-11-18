interface IParams {
  actual: number;
  ongoing: number;
  queued: number;
}

export class BuildingLevel implements IParams {
  public actual = 0;
  public ongoing = 0;
  public queued = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public total = (): number =>
    this.actual + this.ongoing + this.queued;
}
