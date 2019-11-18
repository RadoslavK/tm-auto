interface IParams {
  allowTasks: boolean;
}

export class GeneralVillageSettings implements IParams {
  public allowTasks = true;

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
