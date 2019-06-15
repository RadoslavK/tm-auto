interface IParams {
  autoBuild: boolean;
}

export class GeneralSettings implements IParams {
  autoBuild: boolean = true;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
