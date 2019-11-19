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
import { IIsBotRunningQuery, IStartBotMutation, IStopBotMutation } from '../../../_types/graphql';
import { INavigationItem } from '../../../_types/INavigationItem';

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

const ToggleButton: React.FC<{ readonly isBotRunning: boolean, readonly onClick: () => void; }> = React.forwardRef((props, ref: any) => {
  const {
    isBotRunning,
    onClick,
  } = props;

  return (
    <Button
      ref={ref}
      variant="contained"
      color="primary"
      onClick={onClick}
    >
      {isBotRunning ? 'Stop bot' : 'Start bot'}
    </Button>
  );
});

export const Navigation: React.FC<IProps> = (props) => {
  const {
    navigationItems,
    drawerWidth,
  } = props;

  const classes = useStyles(drawerWidth)({});
  const location = useLocation();
  const { data, loading, refetch } = useQuery<IIsBotRunningQuery>(IsBotRunning);
  const [startBot] = useMutation<IStartBotMutation>(StartBot);
  const [stopBot] = useMutation<IStopBotMutation>(StopBot);

  useSubscription(OnBotRunningChanged, {
    onSubscriptionData: () => refetch(),
  });

  if (loading || !data) {
    return null;
  }

  const currentItemIndex = navigationItems.findIndex(item => location.pathname.startsWith(item.path));

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
        <Tab
          component={ToggleButton}
          onClick={onClick}
          isBotRunning={isBotRunning}
        />
      </Tabs>
    </AppBar>
  );
};
