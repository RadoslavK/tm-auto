import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useMemo,
} from 'react';
import {
  useQueryLoader,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { EnsureSignedInBotStateQuery } from '../../../_graphql/__generated__/EnsureSignedInBotStateQuery.graphql.js';
import type { EnsureSignedInBotStateSubscription } from '../../../_graphql/__generated__/EnsureSignedInBotStateSubscription.graphql.js';
import type { SignInFormQuery } from '../../../_graphql/__generated__/SignInFormQuery.graphql.js';
import { useLazyLoadQuery } from '../../../_shared/hooks/useLazyLoadQuery.js';
import { GraphiQL } from '../../GraphiQL.js';
import { SettingsManagement } from '../../settings/management/SettingsManagement.js';
import {
  SignInForm,
  signInFormQuery,
} from './SignInForm.js';

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
  const { botState } = useLazyLoadQuery<EnsureSignedInBotStateQuery>(botStateQuery, {}, { fetchPolicy: 'store-and-network' });

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<EnsureSignedInBotStateSubscription> => ({
    subscription: botStateSubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.botStateChanged, 'botState');
    },
  }), []);

  useSubscription(subscriptionConfig);

  const [signInFormQueryRef, loadSignInFormQuery] = useQueryLoader<SignInFormQuery>(signInFormQuery);

  useEffect(() => {
    if (botState !== 'None') {
      return;
    }

    loadSignInFormQuery({}, { fetchPolicy: 'network-only' });
  }, [botState, loadSignInFormQuery]);

  if (botState === 'None') {
    return (
      <div>
        <GraphiQL />
        <SettingsManagement />
        {signInFormQueryRef && <SignInForm queryRef={signInFormQueryRef} />}
      </div>
    );
  }

  return <>{children}</>;
};

EnsureSignedIn.displayName = 'EnsureSignedIn';