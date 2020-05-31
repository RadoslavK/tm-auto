import {
  useEffect,
  useState,
} from 'react';

import {
  useActiveVillageIdChangedSubscription,
  useActiveVillageIdQuery,
} from '../../../_graphql/graphqlHooks';

export const useActiveVillageId = (): number | undefined => {
  const [activeVillageId, setActiveVillageId] = useState<number>();

  const queryResult = useActiveVillageIdQuery();

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setActiveVillageId(queryResult.data.activeVillageId);
    }
  }, [queryResult]);

  useActiveVillageIdChangedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        setActiveVillageId(data.activeVillageIdChanged);
      }
    },
  });

  return activeVillageId;
};