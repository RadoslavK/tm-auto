import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useMemo,
} from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { HeroBotStateSubscription } from '../../../_graphql/__generated__/HeroBotStateSubscription.graphql.js';
import type { HeroInformationQuery } from '../../../_graphql/__generated__/HeroInformationQuery.graphql.js';
import type { HeroQuery } from '../../../_graphql/__generated__/HeroQuery.graphql.js';
import { AutoAdventureSettings } from '../../settings/hero/AutoAdventureSettings.js';
import { HeroLevelUpSettings } from '../../settings/hero/HeroLevelUpSettings.js';
import {
  HeroInformation,
  heroInformationQuery,
} from './HeroInformation.js';

export const heroQuery = graphql`
  query HeroQuery {
      botState
      autoAdventureSettings {
          ...AutoAdventureSettings_autoAdventureSettings
      }
      nextTaskExecution(task: AutoAdventure) {
          ...AutoAdventureSettings_timestamp
      }
      heroLevelUpSettings {
          ...HeroLevelUpSettings_heroLevelUpSettings
      }
  }
`;

const botStateSubscription = graphql`
    subscription HeroBotStateSubscription {
        botStateChanged
    }
`;

type Props = {
  readonly queryRef: PreloadedQuery<HeroQuery>;
};

export const Hero: React.FC<Props> = ({ queryRef }) => {
  const {
    autoAdventureSettings,
    botState,
    nextTaskExecution,
    heroLevelUpSettings,
  } = usePreloadedQuery(heroQuery, queryRef);

  const botStateSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<HeroBotStateSubscription> => ({
    subscription: botStateSubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.botStateChanged, 'botState');
    },
  }), []);

  useSubscription(botStateSubscriptionConfig);

  const [heroInformationQueryRef, loadHeroInformationQuery] = useQueryLoader<HeroInformationQuery>(heroInformationQuery);

  useEffect(() => {
    if (botState === 'InitialScanning') {
      return;
    }

    loadHeroInformationQuery({}, { fetchPolicy: 'store-and-network' });
  }, [botState, loadHeroInformationQuery]);

  return (
    <div>
      <h1>Hero settings</h1>
      {heroInformationQueryRef && <HeroInformation queryRef={heroInformationQueryRef} />}
      <AutoAdventureSettings
        settingsKey={autoAdventureSettings}
        timestampKey={nextTaskExecution}
      />
      <HeroLevelUpSettings settingsKey={heroLevelUpSettings} />
    </div>
  );
};

Hero.displayName = 'Hero';