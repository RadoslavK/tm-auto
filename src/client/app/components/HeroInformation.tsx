import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  HeroState,
  IGetHeroInformationQuery,
  IHeroInformationFragmentFragment,
  IOnHeroInformationUpdatedSubscription,
} from '../../_types/graphql';
import {
  GetHeroInformation,
  OnHeroInformationUpdated,
} from '*/graphql_operations/hero.graphql';

const useHeroInformation = () => {
  const [heroInformation, setHeroInformation] = useState<IHeroInformationFragmentFragment>();
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

export const HeroInformation: React.FC = () => {
  const information = useHeroInformation();
  
  if (!information) {
    return null;
  }

  return (
    <div>
      <h2>Stats</h2>
      <div>
        <label htmlFor="health">Health: </label>
        <span id="heath">{information.health}</span>
      </div>

      <div>
        <label htmlFor="state">State: </label>
        <span id="state">{HeroState[information.state]}</span>
      </div>

      <div>
        <label htmlFor="village">Village: </label>
        {information.village
          ? <Link to={`/villages/${information.village.id}`}>{information.village.name}</Link>
          : <span>Unknown</span>
        }
      </div>
    </div>
  );
};