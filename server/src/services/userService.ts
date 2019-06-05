import { ISignInInput, IUserAccount } from '../_types/graphql';

let userAccount: IUserAccount | null = null;

export const userService = {
  login(input: ISignInInput) {
    userAccount = { ...input };
    this.server = input.server;
  },

  isLoggedIn() {
    return !!userAccount;
  },

  getAccount() {
    if (!userAccount) {
      throw Error('User is not logged in');
    }

    return userAccount;
  },
};
