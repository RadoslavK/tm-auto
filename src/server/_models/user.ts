import { ISignInInput, IUserAccount } from '../_types/graphql';
import { publishEvent } from '../graphql/subscriptions/pubSub';
import { Events } from '../graphql/subscriptions/events';

export class User {
  public isSignedIn = false;

  public account: IUserAccount;

  signIn = (input: ISignInInput): void => {
    this.account = { ...input };
    this.isSignedIn = true;

    publishEvent(Events.SignedInToggled);
  };
}
