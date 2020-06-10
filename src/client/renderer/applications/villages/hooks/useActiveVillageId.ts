import { useEffect } from 'react';

import {
  OnActiveVillageIdChangedDocument,
  OnActiveVillageIdChangedSubscription,
  OnActiveVillageIdChangedSubscriptionVariables,
  useGetActiveVillageIdQuery,
} from '../../../_graphql/graphqlHooks';

export const useActiveVillageId = () => {
  const { data: queryData, loading: queryLoading, subscribeToMore } = useGetActiveVillageIdQuery();

  useEffect(() => {
    subscribeToMore<OnActiveVillageIdChangedSubscription, OnActiveVillageIdChangedSubscriptionVariables>({
      document: OnActiveVillageIdChangedDocument,
      updateQuery: (_prev, { subscriptionData: { data } }) => ({ activeVillageId: data.activeVillageIdChanged }),
    });
  }, [subscribeToMore]);

  return queryLoading || !queryData
    ? null
    : queryData.activeVillageId;
};