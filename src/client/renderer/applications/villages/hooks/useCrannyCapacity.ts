import {
  useGetCrannyCapacityQuery,
  useOnActualBuildingLevelsUpdatedSubscription,
  useOnBuildingsInProgressUpdatedSubscription,
  useOnQueueUpdatedSubscription,
} from '../../../_graphql/graphqlHooks';
import { useSelectedVillageId } from '../../../hooks/villages/useSelectedVillageId';

export const useCrannyCapacity = () => {
  const villageId = useSelectedVillageId();

  const { data: queryData, loading: queryLoading, refetch } = useGetCrannyCapacityQuery({ variables: { villageId } });

  const onSubscriptionData = () => {
    refetch();
  };

  useOnActualBuildingLevelsUpdatedSubscription({
    onSubscriptionData,
    variables: { villageId },
  });

  useOnBuildingsInProgressUpdatedSubscription({
    onSubscriptionData,
    variables: { villageId },
  });

  useOnQueueUpdatedSubscription({
    onSubscriptionData,
    variables: { villageId },
  });

  return queryLoading || !queryData
    ? null
    : queryData.crannyCapacity;
};