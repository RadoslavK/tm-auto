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

  const queryResult = useGetVillagesQuery();

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setVillages(queryResult.data.villages);
    }
  }, [queryResult]);

  useVillagesUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        setVillages(data.villagesUpdated);
      }
    },
  });

  return villages;
};
