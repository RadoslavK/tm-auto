
import {
  useEffect,
  useState,
} from 'react';

import {
  GetVillageQuery,
  useGetVillageQuery,
  useVillageUpdatedSubscription,
} from '../../../_graphql/graphqlHooks';

export const useVillage = (villageId: number) => {
  const [village, setVillage] = useState<GetVillageQuery['village']>();

  const queryResult = useGetVillageQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setVillage(queryResult.data.village);
    }
  }, [queryResult]);

  useVillageUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        setVillage(data.villageUpdated);
      }
    },
    variables: { villageId },
  });

  return village;
};