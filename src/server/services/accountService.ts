import uuid from 'uuid';

import {
  IMutationCreateAccountArgs,
  IMutationUpdateAccountArgs,
  IUserAccount,
} from '../_types/graphql';
import { merge } from '../../_shared/merge';
import { Fields } from '../../_shared/types';
import { dataPathService } from './dataPathService';
import { fileService } from './fileService';

const getDefaults = (): Fields<AccountsData> => ({
  accounts: [],
  lastSignedAccountId: null,
});

class AccountsData {
  public accounts: IUserAccount[];
  public lastSignedAccountId: string | null;

  constructor(params: Partial<AccountsData> = {}) {
    Object.assign(this, merge(getDefaults, params));
  }
}

class AccountService {
  private currentAccountId: string | null = null;
  private accountsData: AccountsData;
  private accountsLoaded = false;

  private saveAccounts = async (): Promise<void> => {
    return fileService.save(dataPathService.accountsPath, this.accountsData);
  };

  public getAccounts = (): readonly IUserAccount[] => {
    if (!this.accountsLoaded) {
      this.load();
    }

    return this.accountsData.accounts;
  };

  public createAccount = async (args: IMutationCreateAccountArgs): Promise<IUserAccount> => {
    const id = uuid.v4();

    const newAccount: IUserAccount = {
      ...args.account,
      id,
    };

    this.accountsData.accounts.push(newAccount);
    await this.saveAccounts();

    return newAccount;
  };

  public accountExists = (args: IMutationCreateAccountArgs | IMutationUpdateAccountArgs): boolean => {
    if ('id' in args.account) {
      const accountId = args.account.id;
      return this.getAccounts().some(acc => acc.id !== accountId && acc.server === args.account.server && acc.username === args.account.username);
    }

    return this.getAccounts().some(acc => acc.server === args.account.server && acc.username === args.account.username);
  };

  public deleteAccount = async (id: string): Promise<void> => {
    const accountIndex = this.accountsData.accounts.findIndex(acc => acc.id === id);

    if (accountIndex === -1) {
      throw new Error(`Account with ${id} was not found`);
    }

    const accountPath = dataPathService.baseAccountPath(id);
    await fileService.delete(accountPath);

    if (this.accountsData.lastSignedAccountId === id) {
      this.accountsData.lastSignedAccountId = null;
    }

    this.accountsData.accounts.splice(accountIndex, 1);
    this.saveAccounts();
  };

  public updateAccount = async (args: IMutationUpdateAccountArgs): Promise<void> => {
    const {
      account,
    } = args;

    const accountIndex = this.accountsData.accounts.findIndex(acc => acc.id === account.id);
    this.accountsData.accounts[accountIndex] = account;
    return this.saveAccounts();
  };

  public getAccount = (accountId: string): IUserAccount | null => {
    const accounts = this.getAccounts();
    return accounts.find(x => x.id === accountId) || null;
  };

  public getCurrentAccount = (): IUserAccount => {
    const accounts = this.getAccounts();
    const account = accounts.find(x => x.id === this.currentAccountId);

    if (!account) {
      throw new Error(`Account with id ${this.currentAccountId} not found`);
    }

    return account;
  };

  public setCurrentAccountId = async (id: string | null): Promise<void> => {
    this.currentAccountId = id;

    if (id) {
      this.accountsData.lastSignedAccountId = id;
    }

    return this.saveAccounts();
  };

  public lastSignedAccountId = (): string | null => {
    if (!this.accountsLoaded) {
      this.load();
    }

    return this.accountsData.lastSignedAccountId;
  };

  private load = (): void => {
    this.accountsData = fileService.loadInstance<AccountsData>(dataPathService.accountsPath, AccountsData);
    this.accountsLoaded = true;
  };
}

export const accountService = new AccountService();
