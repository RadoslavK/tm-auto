type Params = {
  actual: number;
  ongoing: number;
  queued: number;
};

export class BuildingLevel implements Params {
  public actual = 0;
  public ongoing = 0;
  public queued = 0;

  constructor(params: Partial<Params> = {}) {
    Object.assign(this, params);
  }

  public total = (): number =>
    this.actual + this.ongoing + this.queued;
}
