import { useQuery } from '@apollo/react-hooks';

import { GetAccount } from '*/graphql_operations/account.graphql';

import {
  GetAccountQuery,
  GetAccountQueryVariables,
} from '../../../_graphql/types/graphql.type';

export const useGetAccount = (accountId: string): GetAccountQuery['account'] | null => {
  const { data, loading } = useQuery<GetAccountQuery, GetAccountQueryVariables>(
    GetAccount,
    { variables: { accountId } },
  );

  return loading || !data
    ? null
    : data.account;
};