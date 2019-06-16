interface IParams {
  min: number;
  max: number;
}

export class CoolDown implements IParams {
  min: number = 0;
  max: number = 0;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }

  public randomDelay = (): number => {
    return Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  };
}
