interface IParams {
  index: number;
  amount: number;
}

export class QueuedUnit implements IParams {
  public index = 0;
  public amount = 0;

  constructor(params: Partial<IParams>) {
    Object.assign(this, params);
  }
}
