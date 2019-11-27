import React, {
  useEffect,
  useState,
} from 'react';
import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import {
  GetHeroSettings,
  OnAutoAdventureSettingsChanged,
} from "*/graphql_operations/settings.graphql";
import {
  IAutoAdventureSettings,
  IGetHeroSettingsQuery,
  IOnAutoAdventureSettingsChangedSubscription,
} from '../../../../_types/graphql';
import { HeroInformation } from '../../HeroInformation';
import { AutoAdventureSettings } from './AutoAdventureSettings';

export const HeroSettings: React.FC = () => {
  const [settings, setSettings] = useState<IAutoAdventureSettings>();
  const { loading, data } = useQuery<IGetHeroSettingsQuery>(GetHeroSettings);

  useSubscription<IOnAutoAdventureSettingsChangedSubscription>(OnAutoAdventureSettingsChanged, {
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
