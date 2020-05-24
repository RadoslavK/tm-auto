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
  IGetHeroInformationQuery,
  IHeroInformationFragment,
  IOnHeroInformationUpdatedSubscription,
} from '../../../_types/graphql';

export const useHeroInformation = () => {
  const [heroInformation, setHeroInformation] = useState<IHeroInformationFragment>();
  const { data, loading } = useQuery<IGetHeroInformationQuery>(GetHeroInformation);

  useEffect(() => {
    if (loading || !data) {
      return;
    }

    setHeroInformation(data.heroInformation);
  }, [data, loading]);

  useSubscription<IOnHeroInformationUpdatedSubscription>(OnHeroInformationUpdated, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.loading || !subscriptionData.data) {
        return;
      }

      setHeroInformation(subscriptionData.data.heroInformationUpdated);
    },
  });

  return heroInformation;
};