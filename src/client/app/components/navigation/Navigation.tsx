import { useMutation } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import {
  Link,
  useHistory,
  useLocation,
} from 'react-router-dom';

import {
  SignOut,
  StartBot,
  StopBot,
} from '*/graphql_operations/controller.graphql';

import {
  BotState,
  ISignOutMutation,
  IStartBotMutation,
  IStopBotMutation,
} from '../../../_types/graphql';
import { INavigationItem } from '../../../_types/navigationItem';
import { useBotState } from '../../hooks/useBotState';

interface IProps {
  readonly navigationItems: readonly INavigationItem[];
}

const getToggleText = (botState: BotState): string => {
  switch (botState) {
    case BotState.Paused:
      return 'Start';

    case BotState.Running:
    case BotState.Stopping:
      return 'Stop';

    default:
      throw new Error(`Bot shouldnt be in this state (${BotState[botState]}) while navigation is rendered`);
  }
};

const ToggleButton: React.FC = React.forwardRef<unknown, any>((props, ref: any) => {
  const { loading, botState } = useBotState();
  const [startBot] = useMutation<IStartBotMutation>(StartBot);
  const [stopBot] = useMutation<IStopBotMutation>(StopBot);

  const [signOut] = useMutation<ISignOutMutation>(SignOut);

  const history = useHistory();

  if (loading || !botState) {
    return null;
  }

  const onClick = async (): Promise<void> => {
    if (botState === BotState.Running) {
      await stopBot();
    } else if (botState === BotState.Paused) {
      await startBot();
    }
  };

  const onSignOut = (): void => {
    history.push('/');
    signOut();
  };

  return (
    <div ref={ref}>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        disabled={botState === BotState.Stopping}
      >
        {getToggleText(botState)}
      </Button>
      {botState === BotState.Paused && (
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
  } = props;

  const location = useLocation();

  const currentItemIndex = navigationItems.findIndex(item => location.pathname.startsWith(item.path));

  if (currentItemIndex === -1) {
    return null;
  }

  return (
    <AppBar position="fixed">
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
