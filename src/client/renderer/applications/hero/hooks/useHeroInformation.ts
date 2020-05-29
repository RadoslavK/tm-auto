import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import {
  useEffect,
  useState,
} from 'react';

import {
  GetHeroInformation,
  OnHeroInformationUpdated,
} from '*/graphql_operations/hero.graphql';

import {
  GetHeroInformationQuery,
  HeroInformationFragment,
  OnHeroInformationUpdatedSubscription,
} from '../../../_graphql/types/graphql.type';

export const useHeroInformation = () => {
  const [heroInformation, setHeroInformation] = useState<HeroInformationFragment>();
  const { data, loading } = useQuery<GetHeroInformationQuery>(GetHeroInformation);

  useEffect(() => {
    if (loading || !data) {
      return;
    }

    setHeroInformation(data.heroInformation);
  }, [data, loading]);

  useSubscription<OnHeroInformationUpdatedSubscription>(OnHeroInformationUpdated, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.loading || !subscriptionData.data) {
        return;
      }

      setHeroInformation(subscriptionData.data.heroInformationUpdated);
    },
  });

  return heroInformation;
};