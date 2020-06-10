import { useEffect } from 'react';

import {
  OnVillagesUpdatedDocument,
  OnVillagesUpdatedSubscription,
  OnVillagesUpdatedSubscriptionVariables,
  useGetVillagesQuery,
} from '../../_graphql/graphqlHooks';

export const useVillages = () => {
  const { data: queryData, loading: queryLoading, subscribeToMore } = useGetVillagesQuery();

  useEffect(() => {
    subscribeToMore<OnVillagesUpdatedSubscription, OnVillagesUpdatedSubscriptionVariables>({
      document: OnVillagesUpdatedDocument,
      updateQuery: (_prev, { subscriptionData: { data } }) => ({ villages: data.villagesUpdated }),
    });
  }, [subscribeToMore]);

  return queryLoading || !queryData
    ? []
    : queryData.villages;
};
