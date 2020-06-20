import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

import {
  OnBotActivityChangedDocument,
  OnBotActivityChangedSubscription,
  OnBotActivityChangedSubscriptionVariables,
  useIsBotActiveQuery,
} from '../_graphql/graphqlHooks';

const useBotActivity = () => {
  const {
    data: queryData,
    loading: queryLoading,
    subscribeToMore,
  } = useIsBotActiveQuery();

  useEffect(() => {
    subscribeToMore<
      OnBotActivityChangedSubscription,
      OnBotActivityChangedSubscriptionVariables
    >({
      document: OnBotActivityChangedDocument,
      updateQuery: (_prev, { subscriptionData: { data } }) => ({
        isBotActive: data.botActivityChanged,
      }),
    });
  }, [subscribeToMore]);

  return !queryLoading && !!queryData?.isBotActive;
};

type StylesProps = {
  readonly isActive: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: (props) => ({
    color: props.isActive ? 'green' : 'red',
  }),
});

export const BotActivity: React.FC = () => {
  const isActive = useBotActivity();
  const classes = useStyles({ isActive });

  return <div className={classes.root}>{isActive ? 'ACTIVE' : 'INACTIVE'}</div>;
};
