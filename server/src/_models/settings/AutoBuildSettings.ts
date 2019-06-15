interface IParams {
  allow: boolean;
}

export class AutoBuildSettings implements IParams {
  public allow: boolean = true;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
