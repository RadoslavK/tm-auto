import { IUserAccountInput, IUserAccount } from '../_types/graphql';
import { publishEvent } from '../graphql/subscriptions/pubSub';
import { Events } from '../graphql/subscriptions/events';

export class User {
  public isSignedIn = false;

  public account: Omit<IUserAccount, 'id'>;

  signIn = (input: IUserAccountInput): void => {
    this.account = { ...input };
    this.isSignedIn = true;

    publishEvent(Events.SignedInToggled);
  };

  signOut = (): void => {
    this.isSignedIn = false;

    publishEvent(Events.SignedInToggled);
  };
}
