import {
  useQuery,
  useSubscription,
} from '@apollo/client';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  GetHeroSettings,
  OnAutoAdventureSettingsChanged,
} from '*/graphql_operations/settings.graphql';

import {
  AutoAdventureSettings as AutoAdventureSettingsModel,
  GetHeroSettingsQuery,
  OnAutoAdventureSettingsChangedSubscription,
} from '../../../_graphql/types/graphql.type';
import { HeroInformation } from '../../hero/components/HeroInformation';
import { AutoAdventureSettings } from './AutoAdventureSettings';

export const HeroSettings: React.FC = () => {
  const [settings, setSettings] = useState<AutoAdventureSettingsModel>();
  const { data, loading } = useQuery<GetHeroSettingsQuery>(GetHeroSettings);

  useSubscription<OnAutoAdventureSettingsChangedSubscription>(OnAutoAdventureSettingsChanged, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setSettings(subscriptionData.data.autoAdventureSettingsChanged);
      }
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setSettings(data.hero.autoAdventure);
    }
  }, [data, loading]);

  if (!settings) {
    return null;
  }

  return (
    <div>
      <h1>Hero settings</h1>
      <HeroInformation />
      <AutoAdventureSettings settings={settings} />
    </div>
  );
};
