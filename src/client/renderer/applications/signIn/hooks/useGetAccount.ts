import { useQuery } from '@apollo/react-hooks';

import { GetAccount } from '*/graphql_operations/account.graphql';

import {
  IGetAccountQuery,
  IGetAccountQueryVariables,
} from '../../../_types/graphql';

export const useGetAccount = (accountId: string): IGetAccountQuery['account'] | null => {
  const { data, loading } = useQuery<IGetAccountQuery, IGetAccountQueryVariables>(
    GetAccount,
    { variables: { accountId } },
  );

  return loading || !data
    ? null
    : data.account;
};