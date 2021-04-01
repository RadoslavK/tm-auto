import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { EnsureSignedInBotStateQuery } from '../../../_graphql/__generated__/EnsureSignedInBotStateQuery.graphql.js';
import type { EnsureSignedInBotStateSubscription } from '../../../_graphql/__generated__/EnsureSignedInBotStateSubscription.graphql.js';
import { SettingsManagement } from '../../settings/management/SettingsManagement.js';
import { SignInForm } from './SignInForm.js';

const botStateQuery = graphql`
  query EnsureSignedInBotStateQuery {
      botState
  }
`;

const botStateSubscription = graphql`
  subscription EnsureSignedInBotStateSubscription {
      botStateChanged
  }
`;

export const EnsureSignedIn: React.FC = ({ children }) => {
  const { botState } = useLazyLoadQuery<EnsureSignedInBotStateQuery>(botStateQuery, {});

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<EnsureSignedInBotStateSubscription> => ({
    subscription: botStateSubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.botStateChanged, 'botState');
    },
  }), []);

  useSubscription(subscriptionConfig);

  if (botState === 'None' || botState === 'Pending') {
    return (
      <div>
        <SettingsManagement />
        <SignInForm />
      </div>
    );
  }

  return <>{children}</>;
};

EnsureSignedIn.displayName = 'EnsureSignedIn';