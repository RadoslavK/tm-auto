import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useMemo,
} from 'react';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import { useSetRecoilState } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { EnsureGlobalStateGameInfoQuery } from '../_graphql/__generated__/EnsureGlobalStateGameInfoQuery.graphql.js';
import type { EnsureGlobalStateGameInfoSubscription } from '../_graphql/__generated__/EnsureGlobalStateGameInfoSubscription.graphql.js';
import { tribeState } from '../_recoil/atoms/tribe.js';

const gameInfoQuery = graphql`
  query EnsureGlobalStateGameInfoQuery {
      gameInfo {
          tribe
      }
  }
`;

const gameInfoSubscription = graphql`
    subscription EnsureGlobalStateGameInfoSubscription {
        onGameInfoUpdated {
            tribe
        }
    }
`;

export const EnsureGlobalState: React.FC = () => {
  const setTribeState = useSetRecoilState(tribeState);

  const { gameInfo } = useLazyLoadQuery<EnsureGlobalStateGameInfoQuery>(gameInfoQuery, {});

  const gameInfoSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<EnsureGlobalStateGameInfoSubscription> => ({
    subscription: gameInfoSubscription,
    variables: {},
    updater: (store) => {
      const newRecord = store.getRootField('onGameInfoUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'gameInfo');
    },
  }), []);

  useSubscription(gameInfoSubscriptionConfig);

  useEffect(() => {
    setTribeState(gameInfo.tribe);
  }, [setTribeState, gameInfo]);

  return null;
};

EnsureGlobalState.displayName = 'EnsureGlobalState';