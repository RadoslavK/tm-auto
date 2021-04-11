import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { HeroBotStateSubscription } from '../../../_graphql/__generated__/HeroBotStateSubscription.graphql.js';
import type { HeroQuery } from '../../../_graphql/__generated__/HeroQuery.graphql.js';
import { AutoAdventureSettings } from '../../settings/hero/AutoAdventureSettings.js';
import { HeroLevelUpSettings } from '../../settings/hero/HeroLevelUpSettings.js';
import { HeroInformation } from './HeroInformation.js';

const query = graphql`
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

export const Hero: React.FC = () => {
  const {
    autoAdventureSettings,
    botState,
    nextTaskExecution,
    heroLevelUpSettings,
  } = useLazyLoadQuery<HeroQuery>(query, {}, { fetchPolicy: 'store-and-network' });

  const botStateSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<HeroBotStateSubscription> => ({
    subscription: botStateSubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.botStateChanged, 'botState');
    },
  }), []);

  useSubscription(botStateSubscriptionConfig);

  return (
    <div>
      <h1>Hero settings</h1>
      {botState !== 'InitialScanning' && <HeroInformation />}
      <AutoAdventureSettings
        settingsKey={autoAdventureSettings}
        timestampKey={nextTaskExecution}
      />
      <HeroLevelUpSettings settingsKey={heroLevelUpSettings} />
    </div>
  );
};

Hero.displayName = 'Hero';