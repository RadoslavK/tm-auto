import {
  useEffect,
  useState,
} from 'react';

import {
  CrannyCapacityQuery,
  useActualBuildingLevelsUpdateSubscription,
  useBuildingsInProgressUpdatedSubscription,
  useCrannyCapacityQuery,
  useOnQueueUpdatedSubscription,
} from '../../../_graphql/graphqlHooks';
import { useVillageContext } from '../context/villageContext';

export const useCrannyCapacity = () => {
  const { villageId } = useVillageContext();

  const [capacity, setCapacity] = useState<CrannyCapacityQuery['crannyCapacity']>();

  const { data: queryData, loading: queryLoading, refetch } = useCrannyCapacityQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryLoading && queryData) {
      setCapacity(queryData.crannyCapacity);
    }
  }, [queryLoading, queryData]);

  const onSubscriptionData = () => {
    refetch();
  };

  useActualBuildingLevelsUpdateSubscription({
    onSubscriptionData,
    variables: { villageId },
  });

  useBuildingsInProgressUpdatedSubscription({
    onSubscriptionData,
    variables: { villageId },
  });

  useOnQueueUpdatedSubscription({
    onSubscriptionData,
    variables: { villageId },
  });

  return capacity;
};