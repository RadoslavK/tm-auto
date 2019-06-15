interface IParams {
  health: number;
  villageId: number;
}

export class Hero implements IParams {
  public health: number = 0;
  public villageId: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
