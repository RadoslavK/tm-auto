import uuid from 'uuid';
import { User } from '../_models/user';
import { IUserAccount } from '../_types/graphql';
import { fileUtils } from '../utils/fileUtils';

const accountsPath = 'accounts.json';

class UserService {
  private user: User = new User();
  private accounts: IUserAccount[] = [];
  private accountsLoaded = false;

  public get = (): User => this.user;

  public getAccounts = (): readonly IUserAccount[] => {
    if (this.accountsLoaded) {
      return this.accounts;
    }

    this.accounts = fileUtils.load<IUserAccount[]>(accountsPath, []);
    this.accountsLoaded = true;

    return this.accounts;
  };

  public accountExists = (acc: Omit<IUserAccount, 'id'>): boolean => {
    const accounts = this.getAccounts();

    return accounts.some(x => x.username === acc.username && x.server === acc.server);
  };
  
  public createAccount = async (params: Omit<IUserAccount, 'id'>): Promise<IUserAccount> => {
    const id = uuid.v4();
    
    const newAccount: IUserAccount = {
      ...params,
      id,
    };
    
    this.accounts.push(newAccount);
    await fileUtils.save(accountsPath, this.accounts);
    
    return newAccount;
  };
}

export const userService = new UserService();