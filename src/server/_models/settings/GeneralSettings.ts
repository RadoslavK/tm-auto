interface IParams {
  allowTasks: boolean;
  autoBuild: boolean;
  autoUnits: boolean;
}

export class GeneralSettings implements IParams {
  allowTasks = true;
  autoBuild = true;
  autoUnits = true;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
