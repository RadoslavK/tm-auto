import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { BotActivityQuery } from '../_graphql/__generated__/BotActivityQuery.graphql.js';
import type { BotActivitySubscription } from '../_graphql/__generated__/BotActivitySubscription.graphql.js';

type StylesProps = {
  readonly isBotActive: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: (props) => ({
    color: props.isBotActive ? 'green' : 'red',
  }),
});

const botActivityQuery = graphql`
    query BotActivityQuery {
        isBotActive
    }
`;

const botActivitySubscription = graphql`
  subscription BotActivitySubscription {
      botActivityChanged
  }
`;

export const BotActivity: React.FC = () => {
  const { isBotActive } = useLazyLoadQuery<BotActivityQuery>(botActivityQuery, {});
  
  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BotActivitySubscription> => ({
    subscription: botActivitySubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.botActivityChanged, 'isBotActive');
    },
  }), []);

  useSubscription(subscriptionConfig);

  const classes = useStyles({ isBotActive });

  return <div className={classes.root}>{isBotActive ? 'ACTIVE' : 'INACTIVE'}</div>;
};

BotActivity.displayName = 'BotActivity';