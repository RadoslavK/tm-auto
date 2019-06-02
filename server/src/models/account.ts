export interface IAccount {
  readonly username: string;
  readonly password: string;
  readonly url: string;
}

export class Account {
  readonly username: string = '';
  readonly password: string = '';
  readonly url: string = '';

  constructor(params: Partial<IAccount> = {}) {
    Object.assign(this, params);
  }
}
