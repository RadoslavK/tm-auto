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

  const { data: queryData, loading: queryLoading } = useActiveVillageIdQuery();

  useEffect(() => {
    if (!queryLoading && queryData) {
      setActiveVillageId(queryData.activeVillageId);
    }
  }, [queryData, queryLoading]);

  useActiveVillageIdChangedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        setActiveVillageId(data.activeVillageIdChanged);
      }
    },
  });

  return activeVillageId;
};