import { useQuery } from '@apollo/react-hooks';

import { GetCurrentAccount } from '*/graphql_operations/account.graphql';

import { GetCurrentAccountQuery } from '../_types/graphql';

export const useCurrentAccount = (): GetCurrentAccountQuery['currentAccount'] | null => {
  const { data, loading } = useQuery<GetCurrentAccountQuery>(GetCurrentAccount);

  return loading || !data
    ? null
    : data.currentAccount;
};