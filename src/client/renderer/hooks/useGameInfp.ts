import { useGetGameInfoQuery } from '../_graphql/graphqlHooks';

export const useGameInfo = () => {
  const { data, loading } = useGetGameInfoQuery({ fetchPolicy: 'cache-first' });

  return loading || !data ? null : data.gameInfo;
};
