import { useQuery } from '@apollo/client';

import { GetAccounts } from '*/graphql_operations/account.graphql';

import { GetAccountsQuery } from '../../../_graphql/types/graphql.type';

export const useAccounts = (): GetAccountsQuery['accounts'] | null => {
  const { data, loading } = useQuery<GetAccountsQuery>(GetAccounts);

  return loading || !data
    ? null
    : data.accounts;
};