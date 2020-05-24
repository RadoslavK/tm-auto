import { useQuery } from '@apollo/react-hooks';

import { GetCurrentAccount } from '*/graphql_operations/account.graphql';

import { IGetCurrentAccountQuery } from '../_types/graphql';

export const useCurrentAccount = (): IGetCurrentAccountQuery['currentAccount'] | null => {
  const { data, loading } = useQuery<IGetCurrentAccountQuery>(GetCurrentAccount);

  return loading || !data
    ? null
    : data.currentAccount;
};