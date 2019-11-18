interface IParams {
  allowTasks: boolean;
  autoBuild: boolean;
}

export class GeneralSettings implements IParams {
  allowTasks = true;
  autoBuild = true;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
