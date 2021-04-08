import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { HeroBotStateQuery } from '../../../_graphql/__generated__/HeroBotStateQuery.graphql.js';
import type { HeroBotStateSubscription } from '../../../_graphql/__generated__/HeroBotStateSubscription.graphql.js';
import { AutoAdventureSettings } from '../../settings/hero/AutoAdventureSettings.js';
import { HeroLevelUpSettings } from '../../settings/hero/HeroLevelUpSettings.js';
import { HeroInformation } from './HeroInformation.js';

const botStateQuery = graphql`
  query HeroBotStateQuery {
      botState
  }
`;

const botStateSubscription = graphql`
    subscription HeroBotStateSubscription {
        botStateChanged
    }
`;

export const Hero: React.FC = () => {
  const { botState } = useLazyLoadQuery<HeroBotStateQuery>(botStateQuery, {}, { fetchPolicy: 'store-and-network' });

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
      {botState !== 'InitialScanning' && <HeroInformation/>}
      <AutoAdventureSettings/>
      <HeroLevelUpSettings/>
    </div>
  );
};

Hero.displayName = 'Hero';