
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

  const { data: queryData, loading: queryLoading } = useGetVillageQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryLoading && queryData) {
      setVillage(queryData.village);
    }
  }, [queryData, queryLoading]);

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