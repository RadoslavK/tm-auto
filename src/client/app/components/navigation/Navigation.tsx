import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import {
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import { Link, useLocation } from 'react-router-dom';
import { IsBotRunning, StartBot, StopBot, OnBotRunningChanged } from "*/graphql_operations/controller.graphql";
import {
  IIsBotRunningQuery,
  ISignOutMutation,
  IStartBotMutation,
  IStopBotMutation,
} from '../../../_types/graphql';
import { INavigationItem } from '../../../_types/INavigationItem';
import {
  IsSignedIn,
  SignOut,
} from '*/graphql_operations/user.graphql';

const useStyles = (drawerWidth: number): any => makeStyles({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
});

interface IProps {
  readonly drawerWidth: number;
  readonly navigationItems: readonly INavigationItem[];
}

const ToggleButton: React.FC = React.forwardRef<unknown, any>((props, ref: any) => {
  const { data, loading, refetch } = useQuery<IIsBotRunningQuery>(IsBotRunning);
  const [startBot] = useMutation<IStartBotMutation>(StartBot);
  const [stopBot] = useMutation<IStopBotMutation>(StopBot);

  useSubscription(OnBotRunningChanged, {
    onSubscriptionData: () => refetch(),
  });

  const [signOut] = useMutation<ISignOutMutation>(SignOut, {
    refetchQueries: [{ query: IsSignedIn }],
  });

  if (loading || !data) {
    return null;
  }

  const {
    isBotRunning,
  } = data;

  const onClick = async (): Promise<void> => {
    if (isBotRunning) {
      await stopBot();
    } else {
      await startBot();
    }
  };

  const onSignOut = (): void => {
    signOut();
  };

  return (
    <div ref={ref}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
      >
        {isBotRunning ? 'Stop bot' : 'Start bot'}
      </Button>
      {!isBotRunning && (
        <Button
          variant="contained"
          color="secondary"
          onClick={onSignOut}
        >
          Sign out
        </Button>
      )}
    </div>
  );
});

export const Navigation: React.FC<IProps> = (props) => {
  const {
    navigationItems,
    drawerWidth,
  } = props;

  const classes = useStyles(drawerWidth)({});
  const location = useLocation();

  const currentItemIndex = navigationItems.findIndex(item => location.pathname.startsWith(item.path));

  if (currentItemIndex === -1) {
    return null;
  }

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Tabs
        value={currentItemIndex}
        indicatorColor="primary"
        centered
      >
        {navigationItems.map((route, index) => (
          <Tab
            key={index}
            label={route.text}
            component={Link}
            to={route.path}
          />
        ))}
        <Tab component={ToggleButton} />
      </Tabs>
    </AppBar>
  );
};
