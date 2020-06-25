import { mergeDefaults } from '../../_shared/merge';
import { PartialFields } from '../../_shared/types/fields.type';
import { dataPathService } from './dataPathService';
import { fileService } from './fileService';

export type UserAccount = {
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly server: string;
};

export class AccountsData {
  public readonly accounts: UserAccount[] = [];

  public lastSignedAccountId: string | null = null;

  constructor(params: PartialFields<AccountsData> = {}) {
    mergeDefaults(this, params);
  }
}

const getBaseServerUrl = (server: string, safe = false): string => {
  const correctedServerMatch = /(.*travian\.[^/]*)/.exec(server);

  if (!correctedServerMatch) {
    if (safe) {
      throw new Error(`Invalid server url: ${server}`);
    } else {
      return server;
    }
  }

  return correctedServerMatch[1];
};

class AccountService {
  public accountsData: AccountsData | null = null;

  public currentAccountId: string | null = null;

  private saveAccounts = async (): Promise<void> =>
    fileService.save(dataPathService.accountsPath(), this.accountsData);

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

  public createAccount = (account: Omit<UserAccount, 'id'>): UserAccount => {
    const server = getBaseServerUrl(account.server);
    const id = Buffer.from(`${account.username}@${server}`).toString('base64');

    const newAccount: UserAccount = {
      ...account,
      id,
      server,
    };

    this.getAccountsData().accounts.push(newAccount);
    this.saveAccounts();

    return newAccount;
  };

  public isAccountTaken = (account: Omit<UserAccount, 'id'>): boolean =>
    this.getAccounts().some(
      (acc) =>
        acc.server === getBaseServerUrl(account.server, false) &&
        acc.username === account.username,
    );

  public deleteAccount = (id: string): UserAccount => {
    const accountIndex = this.getAccountsData().accounts.findIndex(
      (acc) => acc.id === id,
    );

    if (accountIndex === -1) {
      throw new Error(`Account with ${id} was not found`);
    }

    const accountPath = dataPathService.accountPath(id).root;
    fileService.delete(accountPath);

    const accountsData = this.getAccountsData();

    if (accountsData.lastSignedAccountId === id) {
      accountsData.lastSignedAccountId = null;
    }

    const removedAccount = accountsData.accounts.splice(accountIndex, 1);

    this.saveAccounts();

    return removedAccount[0];
  };

  public updateAccount = (account: UserAccount): UserAccount => {
    const accountsData = this.getAccountsData();
    const accountIndex = accountsData.accounts.findIndex(
      (acc) => acc.id === account.id,
    );

    if (accountIndex === -1) {
      throw new Error(`Account with id: ${account.id} does not exist`);
    }

    accountsData.accounts[accountIndex] = {
      ...account,
      server: getBaseServerUrl(account.server),
    };

    this.saveAccounts();

    return account;
  };

  public getAccount = (accountId: string): UserAccount | null => {
    const accounts = this.getAccounts();
    return accounts.find((x) => x.id === accountId) || null;
  };

  public getCurrentAccount = (): UserAccount => {
    const accounts = this.getAccounts();
    const account = accounts.find((x) => x.id === this.currentAccountId);

    if (!account) {
      throw new Error(`Account with id ${this.currentAccountId} not found`);
    }

    return account;
  };

  public lastSignedAccountId = () => this.getAccountsData().lastSignedAccountId;

  public getAccountsData = (): AccountsData => {
    if (!this.accountsData) {
      this.accountsData = this.loadAccountsData();
    }

    return this.accountsData;
  };

  public loadAccountsData = (): AccountsData => {
    this.accountsData = fileService.loadInstance<AccountsData>(
      dataPathService.accountsPath(),
      AccountsData,
    );

    return this.accountsData;
  };

  public updateAccountsData = (accountsData: AccountsData) => {
    this.accountsData = accountsData;

    this.saveAccounts();
  };
}

export const accountService = new AccountService();
