interface IParams {
  granary: number;
  warehouse: number;
}

export class VillageCapacity implements IParams {
  public granary = 0;
  public warehouse = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
