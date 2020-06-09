import { generateId } from '../../_shared/generateId';
import { mergeDefaults } from '../../_shared/merge';
import { PartialFields } from '../../_shared/types/fields.type';
import { dataPathService } from './dataPathService';
import { fileService } from './fileService';

type UserAccount = {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly server: string;
};

class AccountsData {
  public readonly accounts: UserAccount[] = [];

  public lastSignedAccountId: string | null = null;

  constructor(params: PartialFields<AccountsData> = {}) {
    mergeDefaults(this, params);
  }
}

class AccountService {
  private accountsData: AccountsData | null = null;

  private currentAccountId: string | null = null;

  private saveAccounts = async (): Promise<void> => fileService.save(dataPathService.accountsPath(), this.accountsData);

  public setCurrentAccountId = (id: string | null) => {
    this.currentAccountId = id;

    if (!id) {
      return;
    }

    this.getAccountsData().lastSignedAccountId = this.currentAccountId;

    this.saveAccounts();
  };

  public getAccounts = (): readonly UserAccount[] => {
    if (!this.accountsData) {
      return this.getAccountsData().accounts;
    }

    return this.accountsData.accounts;
  };

  public createAccount = async (account: Omit<UserAccount, 'id'>): Promise<UserAccount> => {
    const id = generateId();

    const correctedServerMatch = /(.*travian\.[^/]*)/.exec(account.server);

    if (!correctedServerMatch) {
      throw new Error(`Invalid server url: ${account.server}`);
    }

    const newAccount: UserAccount = {
      ...account,
      id,
      server: correctedServerMatch[1],
    };

    this.getAccountsData().accounts.push(newAccount);
    await this.saveAccounts();

    return newAccount;
  };

  public accountExists = (account: Omit<UserAccount, 'id'> & { readonly id?: string }): boolean => {
    if ('id' in account) {
      const accountId = account.id;
      return this.getAccounts().some(acc => acc.id !== accountId && acc.server === account.server && acc.username === account.username);
    }

    return this.getAccounts().some(acc => acc.server === account.server && acc.username === account.username);
  };

  public deleteAccount = async (id: string): Promise<void> => {
    const accountIndex = this.getAccountsData().accounts.findIndex(acc => acc.id === id);

    if (accountIndex === -1) {
      throw new Error(`Account with ${id} was not found`);
    }

    const accountPath = dataPathService.baseAccountPath(id);
    await fileService.delete(accountPath);

    const accountsData = this.getAccountsData();

    if (accountsData.lastSignedAccountId === id) {
      accountsData.lastSignedAccountId = null;
    }

    accountsData.accounts.splice(accountIndex, 1);
    this.saveAccounts();
  };

  public updateAccount = async (account: UserAccount): Promise<void> => {
    const accountsData = this.getAccountsData();
    const accountIndex = accountsData.accounts.findIndex(acc => acc.id === account.id);
    accountsData.accounts[accountIndex] = account;
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

  public lastSignedAccountId = (): string | null => this.getAccountsData().lastSignedAccountId;

  private getAccountsData = (): AccountsData => {
    if (!this.accountsData) {
      this.accountsData = fileService.loadInstance<AccountsData>(dataPathService.accountsPath(), AccountsData);
    }

    return this.accountsData;
  };
}

export const accountService = new AccountService();