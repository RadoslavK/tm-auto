import { IAccount } from '../../../../_shared/contract/models/IAccount';

export class Account implements IAccount {
  readonly username: string = '';
  readonly password: string = '';
  readonly url: string = '';

  constructor(params: Partial<IAccount> = {}) {
    Object.assign(this, params);
  }
}
