interface IParams {
  username: string;
  password: string;
  server: string;
}

export class UserAccount {
  public username: string = '';
  public password: string = '';
  public server: string = '';

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
