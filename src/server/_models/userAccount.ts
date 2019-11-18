interface IParams {
  username: string;
  password: string;
  server: string;
}

export class UserAccount implements IParams {
  public username = '';
  public password = '';
  public server = '';

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
