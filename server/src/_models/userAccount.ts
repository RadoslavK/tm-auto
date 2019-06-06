interface IParams {
  username: string;
  password: string;
  server: string;
}

export class UserAccount implements IParams {
  username: string = '';
  password: string = '';
  server: string = '';

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);
  }
}
