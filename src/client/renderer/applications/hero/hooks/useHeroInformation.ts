import {
  useEffect,
  useState,
} from 'react';

import {
  HeroInformationFragment,
  useGetHeroInformationQuery,
  useOnHeroInformationUpdatedSubscription,
} from '../../../_graphql/graphqlHooks';

export const useHeroInformation = () => {
  const [heroInformation, setHeroInformation] = useState<HeroInformationFragment>();

  const { data, loading } = useGetHeroInformationQuery();

  useEffect(() => {
    if (loading || !data) {
      return;
    }

    setHeroInformation(data.heroInformation);
  }, [data, loading]);

  useOnHeroInformationUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.loading || !subscriptionData.data) {
        return;
      }

      setHeroInformation(subscriptionData.data.heroInformationUpdated);
    },
  });

  return heroInformation;
};