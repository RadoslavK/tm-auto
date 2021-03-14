import {
  objectType,
  arg,
  idArg,
  inputObjectType,
  queryField,
  mutationField,
  subscriptionField,
} from 'nexus';
import { BotEvent } from '../../events/botEvent';
import {
  subscribeToEvent,
} from '../../pubSub';
import { accountService } from '../../services/accountService';

export const UserAccount = objectType({
  name: 'UserAccount',
  definition(t) {
    t.implements('Node');
    t.id('id');
    t.string('username');
    t.string('password');
    t.string('server');
  },
});

export const AccountInput = inputObjectType({
  name: 'AccountInput',
  definition(t) {
    t.string('username');
    t.string('password');
    t.string('server');
  },
});

export const AccountQuery = queryField(t => {
  t.field('account', {
    type: UserAccount,
    args: {
      id: idArg(),
    },
    resolve: (_p, args) => accountService.getAccount(args.id),
  })
});

export const AccountsQuery = queryField(t => {
  t.list.field('accounts', {
    type: UserAccount,
    //  TODO this cannot work with readonly arrays for some reason
    resolve: () => [...accountService.getAccounts()],
  });
});

export const CurrentAccountQuery = queryField(t => {
  t.field('currentAccount', {
    type: UserAccount,
    resolve: () => accountService.getCurrentAccount(),
  });
});

export const IsAccountTakenQuery = queryField(t => {
  t.field('isAccountTaken', {
    type: 'Boolean',
    args: {
      account: arg({ type: AccountInput }),
    },
    resolve: (_, args) => accountService.isAccountTaken(args.account),
  });
});

export const LastSignedAccountIdQuery = queryField(t => {
  t.nullable.field('lastSignedAccountId', {
    type: 'String',
    resolve: () => accountService.lastSignedAccountId(),
  });
});

export const CreateAccountMutation = mutationField(t => {
  t.field('createAccount', {
    type: UserAccount,
    args: {
      account: arg({ type: AccountInput }),
    },
    resolve: (_p, args) => accountService.createAccount(args.account),
  });
});

export const UpdateAccountMutation = mutationField(t => {
  t.field('updateAccount', {
    type: UserAccount,
    args: {
      id: idArg(),
      account: arg({ type: AccountInput }),
    },
    resolve: (_p, args) => accountService.updateAccount({ ...args.account, id: args.id }),
  });
});

export const DeleteAccountMutation = mutationField(t => {
  t.field('deleteAccount', {
    type: UserAccount,
    args: {
      id: idArg(),
    },
    resolve: (_p, args) => accountService.deleteAccount(args.id),
  });
});

export const AccountsUpdatedSubscription = subscriptionField(t => {
  t.list.field('accountsUpdated', {
    type: UserAccount,
    ...subscribeToEvent(BotEvent.AccountsUpdated, {
      resolve: (p) => [...p.accounts],
    }),
  });
});

export const LastSignedAccountIdUpdatedSubscription = subscriptionField(t => {
  t.nullable.field('lastSignedAccountIdUpdated', {
    type: 'String',
    ...subscribeToEvent(
      BotEvent.LastSignedAccountIdUpdated,
      {
        resolve: (p) => p.lastSignedAccountId,
      },
    )
  });
});