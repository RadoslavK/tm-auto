import {
  GetCurrentAccountQuery,
  useGetCurrentAccountQuery,
} from '../_graphql/graphqlHooks';

export const useCurrentAccount = ():
  | GetCurrentAccountQuery['currentAccount']
  | null => {
  const { data, loading } = useGetCurrentAccountQuery();

  return loading || !data ? null : data.currentAccount;
};
