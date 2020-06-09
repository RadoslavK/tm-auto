import {
  useEffect,
  useState,
} from 'react';

import {
  GetVillagesQuery,
  useGetVillagesQuery,
  useVillagesUpdatedSubscription,
} from '../../_graphql/graphqlHooks';

export const useVillages = () => {
  const [villages, setVillages] = useState<GetVillagesQuery['villages']>();

  const { data: queryData, loading: queryLoading } = useGetVillagesQuery();

  useEffect(() => {
    if (!queryLoading && queryData) {
      setVillages(queryData.villages);
    }
  }, [queryData, queryLoading]);

  useVillagesUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        setVillages(data.villagesUpdated);
      }
    },
  });

  return villages;
};
