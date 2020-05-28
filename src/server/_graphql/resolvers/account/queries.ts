import { Resolvers } from '../../_types';
import { accountService } from '../../../services/accountService';

export default <Resolvers>{
  Query: {
    account: (_, args) => accountService.getAccount(args.accountId),

    accounts: () => accountService.getAccounts(),

    currentAccount: () => accountService.getCurrentAccount(),

    lastSignedAccountId: () => accountService.lastSignedAccountId(),
  },
};