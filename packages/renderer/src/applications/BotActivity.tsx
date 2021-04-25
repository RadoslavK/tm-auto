import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import { useSubscription } from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { BotActivitySubscription } from '../_graphql/__generated__/BotActivitySubscription.graphql.js';

type StylesProps = {
  readonly isBotActive: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: (props) => ({
    color: props.isBotActive ? 'green' : 'red',
  }),
});

const botActivitySubscription = graphql`
  subscription BotActivitySubscription {
      botActivityChanged
  }
`;

type Props = {
  readonly botActivity: string;
};

export const BotActivity: React.FC<Props> = ({ botActivity }) => {
  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BotActivitySubscription> => ({
    subscription: botActivitySubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.botActivityChanged, 'botActivity');
    },
  }), []);

  useSubscription(subscriptionConfig);

  const classes = useStyles({ isBotActive: !!botActivity });

  return <div className={classes.root}>{botActivity || 'Inactive'}</div>;
};

BotActivity.displayName = 'BotActivity';