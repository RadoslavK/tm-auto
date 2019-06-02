import { IAccount } from '../../../../_shared/contract/models/IAccount';
import { ITypedRecord, TypedRecord } from '../../../../_shared/types/typedRecord';

const defaultParams: IAccount = {
  url: '',
  password: '',
  username: '',
};

export interface IAccountRecord extends
  ITypedRecord<IAccount>,
  IAccount {
}

export class Account extends TypedRecord<IAccount>(defaultParams) implements IAccountRecord {
  readonly username: string;
  readonly password: string;
  readonly url: string;
}
