import { ISignInInput, IUserAccount } from '../_types/graphql';

export class UserService {
  public isSignedIn: boolean = false;

  public userAccount: IUserAccount;

  signIn(input: ISignInInput): void {
    this.userAccount = { ...input };
    this.isSignedIn = true;
  }
}
