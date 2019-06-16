interface IParams {
  allowTasks: boolean;
  autoBuild: boolean;
}

export class GeneralSettings implements IParams {
  allowTasks: boolean = true;
  autoBuild: boolean = true;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
