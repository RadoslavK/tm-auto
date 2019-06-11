interface IParams {
  granary: number;
  warehouse: number;
}

export class VillageCapacity implements IParams {
  public granary: number = 0;
  public warehouse: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
