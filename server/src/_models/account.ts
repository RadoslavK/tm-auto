export interface IAccount {
  username: string;
  password: string;
  url: string;
}

export class Account implements IAccount {
  username: string = '';
  password: string = '';
  url: string = '';

  constructor(params: Partial<IAccount> = {}) {
    Object.assign(this, params);
  }
}
