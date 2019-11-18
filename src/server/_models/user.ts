import { ISignInInput, IUserAccount } from '../_types/graphql';

export class User {
  public isSignedIn = false;

  public account: IUserAccount;

  signIn = (input: ISignInInput): void => {
    this.account = { ...input };
    this.isSignedIn = true;
  };
}
