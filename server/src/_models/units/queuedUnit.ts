interface IParams {
  index: number;
  amount: number;
}

export class QueuedUnit implements IParams {
  public index: number = 0;
  public amount: number = 0;

  constructor(params: Partial<IParams>) {
    Object.assign(this, params);
  }
}
