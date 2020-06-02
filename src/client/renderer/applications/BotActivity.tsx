import { makeStyles } from '@material-ui/core/styles';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  useIsBotActiveQuery,
  useOnBotActivityChangedSubscription,
} from '../_graphql/graphqlHooks';

const useBotActivity = () => {
  const [isActive, setIsActive] = useState(false);

  const { data: queryData, loading: queryLoading } = useIsBotActiveQuery();

  useEffect(() => {
    if (!queryLoading && queryData) {
      setIsActive(queryData.isBotActive);
    }
  }, [queryData, queryLoading]);

  useOnBotActivityChangedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        setIsActive(data.botActivityChanged);
      }
    },
  });

  return isActive;
};

type StylesProps = {
  readonly isActive: boolean;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: props => ({
    color: props.isActive ? 'green' : 'red',
  }),
});

export const BotActivity: React.FC = () => {
  const isActive = useBotActivity();
  const classes = useStyles({ isActive });

  return (
    <div className={classes.root}>
      {isActive ? 'ACTIVE' : 'INACTIVE'}
    </div>
  );
};