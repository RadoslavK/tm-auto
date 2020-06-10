import {
  useGetVillageQuery,
  useOnVillageUpdatedSubscription,
} from '../../../_graphql/graphqlHooks';

export const useVillage = (villageId: string) => {
  const { data: queryData, loading: queryLoading } = useGetVillageQuery({ variables: { villageId } });

  useOnVillageUpdatedSubscription({ variables: { villageId } });

  return queryLoading || !queryData
    ? null
    : queryData.village;
};