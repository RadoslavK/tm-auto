import { IUserAccount } from '../_types/graphql';

export class UserAccount implements IUserAccount {
  username: string = '';
  password: string = '';
  server: string = '';

  constructor(params: Partial<IUserAccount> = {}) {
    Object.assign(this, params);
  }
}
