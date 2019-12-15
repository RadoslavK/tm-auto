import { useMutation } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
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
import { useBotState } from '../../hooks/useBotState';

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

const navigationPaths: readonly string[] = [
  '/villages',
  '/hero',
  '/settings',
  '/logs',
];

export const Navigation: React.FC = () => {
  const { pathname } = useLocation();
  const [lastVillagesPath, setLastVillagesPath] = useState<string>();

  const currentItemIndex = navigationPaths.findIndex(path => pathname.startsWith(path));

  if (currentItemIndex === -1) {
    return null;
  }

  const onTabClick = (): void => {
    if (currentItemIndex === 0) {
      setLastVillagesPath(pathname);
    }
  };

  return (
    <AppBar position="fixed">
      <Tabs
        value={currentItemIndex}
        indicatorColor="primary"
        centered
      >
        <Tab label="Villages" component={Link} to={currentItemIndex === 0 ? '#' : lastVillagesPath || navigationPaths[0]} />
        <Tab label="Hero" component={Link} to={navigationPaths[1]} onClick={onTabClick} />
        <Tab label="Settings" component={Link} to={navigationPaths[2]} onClick={onTabClick} />
        <Tab label="Logs" component={Link} to={navigationPaths[3]} onClick={onTabClick} />
        <Tab component={ToggleButton} />
      </Tabs>
    </AppBar>
  );
};
