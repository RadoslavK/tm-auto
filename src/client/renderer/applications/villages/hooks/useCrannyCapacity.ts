import {
  useGetCrannyCapacityQuery,
  useOnActualBuildingLevelsUpdatedSubscription,
  useOnBuildingsInProgressUpdatedSubscription,
  useOnQueueUpdatedSubscription,
} from '../../../_graphql/graphqlHooks';
import { useVillageContext } from '../context/villageContext';

export const useCrannyCapacity = () => {
  const { villageId } = useVillageContext();

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