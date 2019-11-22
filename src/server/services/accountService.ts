import uuid from 'uuid';
import {
  IMutationCreateAccountArgs,
  IMutationSignInArgs,
  IMutationUpdateAccountArgs,
  IUserAccount,
} from '../_types/graphql';
import { fileUtils } from '../utils/fileUtils';
import { logException } from '../../_shared/utils/logException';

const accountsPath = 'accounts.json';

class AccountService {
  private currentAccountId: string | null = null;
  private accounts: IUserAccount[] = [];
  private accountsLoaded = false;

  signIn = (input: IMutationSignInArgs): void => {
    const {
      accountId,
    } = input;

    this.currentAccountId = accountId;
  };

  signOut = (): void => {
    this.currentAccountId = null;
  };

  isSignedIn = (): boolean => !!this.currentAccountId;

  private saveAccounts = async (): Promise<void> => {
    return fileUtils.save(accountsPath, this.accounts);
  };

  public getAccounts = (): readonly IUserAccount[] => {
    if (this.accountsLoaded) {
      return this.accounts;
    }

    this.accounts = fileUtils.load<IUserAccount[]>(accountsPath, []);
    this.accountsLoaded = true;

    return this.accounts;
  };
  
  public createAccount = async (args: IMutationCreateAccountArgs): Promise<IUserAccount> => {
    const id = uuid.v4();

    const newAccount: IUserAccount = {
      ...args.account,
      id,
    };
    
    this.accounts.push(newAccount);
    await this.saveAccounts();
    
    return newAccount;
  };

  public accountExists = (args: IMutationCreateAccountArgs | IMutationUpdateAccountArgs): boolean => {
    if ('id' in args.account) {
      const accountId = args.account.id;
      return this.getAccounts().some(acc => acc.id !== accountId &&  acc.server === args.account.server && acc.username === args.account.username);
    }

    return this.getAccounts().some(acc => acc.server === args.account.server && acc.username === args.account.username);
  };

  public deleteAccount = async (id: string): Promise<void> => {
    const accountIndex = this.accounts.findIndex(acc => acc.id === id);

    if (accountIndex === -1) {
      throw new Error(`Account ${id} was not found`);
    }

    this.accounts.splice(accountIndex, 1);

    return this.saveAccounts();
  };

  public updateAccount = async (args: IMutationUpdateAccountArgs): Promise<void> => {
    const {
      account
    } = args;

    const accountIndex = this.accounts.findIndex(acc => acc.id === account.id);
    this.accounts[accountIndex] = account;
    return this.saveAccounts();
  };

  public getAccount = (accountId: string): IUserAccount | undefined => {
    const accounts = this.getAccounts();
    return accounts.find(x => x.id === accountId);
  };

  public getCurrentAccount = (): IUserAccount => {
    const accounts = this.getAccounts();
    const account = accounts.find(x => x.id === this.currentAccountId);

    if (!account) {
      throw logException(`Account not found ${this.currentAccountId}`);
    }

    return account;
  };
}

export const accountService = new AccountService();