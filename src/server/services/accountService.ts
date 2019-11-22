import uuid from 'uuid';
import {
  IMutationCreateAccountArgs,
  IMutationSignInArgs,
  IMutationUpdateAccountArgs,
  IUserAccount,
} from '../_types/graphql';
import { fileUtils } from '../utils/fileUtils';
import { publishEvent } from '../graphql/subscriptions/pubSub';
import { Events } from '../graphql/subscriptions/events';
import { logException } from '../../../_shared/utils/logException';

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

    publishEvent(Events.SignedInToggled);
  };

  signOut = (): void => {
    this.currentAccountId = null;

    publishEvent(Events.SignedInToggled);
  };

  isSignedIn = (): boolean => !!this.currentAccountId;

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
    await fileUtils.save(accountsPath, this.accounts);
    
    return newAccount;
  };

  public updateAccount = async (args: IMutationUpdateAccountArgs): Promise<void> => {
    const {
      account
    } = args;

    const accountIndex = this.accounts.findIndex(acc => acc.id === account.id);
    this.accounts[accountIndex] = account;
  };

  public getAccount = (): IUserAccount => {
    const accounts = this.getAccounts();
    const account = accounts.find(x => x.id === this.currentAccountId);

    if (!account) {
      throw logException(`Account not found ${this.currentAccountId}`);
    }

    return account;
  };
}

export const accountService = new AccountService();