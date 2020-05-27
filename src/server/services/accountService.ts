import {
  MutationCreateAccountArgs,
  MutationUpdateAccountArgs,
  UserAccount,
} from '../_types/graphql';
import { generateId } from '../../_shared/generateId';
import { mergeDefaults } from '../../_shared/merge';
import { PartialFields } from '../../_shared/types/fields.type';
import { dataPathService } from './dataPathService';
import { fileService } from './fileService';

class AccountsData {
  public readonly accounts: UserAccount[] = [];
  public lastSignedAccountId: string | null = null;

  constructor(params: PartialFields<AccountsData> = {}) {
    mergeDefaults(this, params);
  }
}

class AccountService {
  private currentAccountId: string | null = null;
  private accountsData: AccountsData;
  private accountsLoaded = false;

  private saveAccounts = async (): Promise<void> => fileService.save(dataPathService.accountsPath, this.accountsData);

  public getAccounts = (): readonly UserAccount[] => {
    if (!this.accountsLoaded) {
      this.load();
    }

    return this.accountsData.accounts;
  };

  public createAccount = async (args: MutationCreateAccountArgs): Promise<UserAccount> => {
    const id = generateId();

    const correctedServerMatch = /(.*travian.com)\/?/.exec(args.account.server);

    if (!correctedServerMatch) {
      throw new Error(`Invalid server url: ${args.account.server}`);
    }

    const newAccount: UserAccount = {
      ...args.account,
      id,
      server: correctedServerMatch[1],
    };

    this.accountsData.accounts.push(newAccount);
    await this.saveAccounts();

    return newAccount;
  };

  public accountExists = (args: MutationCreateAccountArgs | MutationUpdateAccountArgs): boolean => {
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

  public updateAccount = async (args: MutationUpdateAccountArgs): Promise<void> => {
    const {
      account,
    } = args;

    const accountIndex = this.accountsData.accounts.findIndex(acc => acc.id === account.id);
    this.accountsData.accounts[accountIndex] = account;
    return this.saveAccounts();
  };

  public getAccount = (accountId: string): UserAccount | null => {
    const accounts = this.getAccounts();
    return accounts.find(x => x.id === accountId) || null;
  };

  public getCurrentAccount = (): UserAccount => {
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
