import { useQuery } from '@apollo/react-hooks';

import { GetAccounts } from '*/graphql_operations/account.graphql';

import { IGetAccountsQuery } from '../../../../_types/graphql';

export const useAccounts = (): IGetAccountsQuery['accounts'] | null => {
  const { data, loading } = useQuery<IGetAccountsQuery>(GetAccounts);

  return loading || !data
    ? null
    : data.accounts;
};