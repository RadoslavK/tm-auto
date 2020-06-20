import { useEffect } from 'react';

import {
  OnHeroInformationUpdatedDocument,
  OnHeroInformationUpdatedSubscription,
  OnHeroInformationUpdatedSubscriptionVariables,
  useGetHeroInformationQuery,
} from '../../../_graphql/graphqlHooks';

export const useHeroInformation = () => {
  const {
    data: queryData,
    loading: queryLoading,
    subscribeToMore,
  } = useGetHeroInformationQuery();

  useEffect(() => {
    subscribeToMore<
      OnHeroInformationUpdatedSubscription,
      OnHeroInformationUpdatedSubscriptionVariables
    >({
      document: OnHeroInformationUpdatedDocument,
      updateQuery: (_prev, { subscriptionData: { data } }) => ({
        heroInformation: data.heroInformationUpdated,
      }),
    });
  }, [subscribeToMore]);

  return queryLoading || !queryData ? null : queryData.heroInformation;
};
