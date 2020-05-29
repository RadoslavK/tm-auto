import { useQuery } from '@apollo/react-hooks';

import { GetAccounts } from '*/graphql_operations/account.graphql';

import { GetAccountsQuery } from '../../../_types/graphql';

export const useAccounts = (): GetAccountsQuery['accounts'] | null => {
  const { data, loading } = useQuery<GetAccountsQuery>(GetAccounts);

  return loading || !data
    ? null
    : data.accounts;
};