interface IParams {
  actual: number;
  ongoing: number;
  queued: number;
}

export class BuildingLevel implements IParams {
  public actual: number = 0;
  public ongoing: number = 0;
  public queued: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public total = (): number =>
    this.actual + this.ongoing + this.queued;
}
