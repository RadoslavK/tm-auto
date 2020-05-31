import {
  useEffect,
  useState,
} from 'react';

import {
  CrannyCapacityQuery,
  useBuildingsInProgressUpdatedSubscription,
  useBuildingSpotsUpdatedSubscription,
  useCrannyCapacityQuery,
  useOnQueueUpdatedSubscription,
} from '../../../_graphql/graphqlHooks';
import { useVillageContext } from '../context/villageContext';

export const useCrannyCapacity = () => {
  const { villageId } = useVillageContext();

  const [capacity, setCapacity] = useState<CrannyCapacityQuery['crannyCapacity']>();

  const queryResult = useCrannyCapacityQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setCapacity(queryResult.data.crannyCapacity);
    }
  }, [queryResult]);

  const onSubscriptionData = () => {
    queryResult.refetch();
  };

  useBuildingSpotsUpdatedSubscription({
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