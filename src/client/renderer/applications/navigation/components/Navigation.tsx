import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import {
  Link,
  useLocation,
} from 'react-router-dom';

import { BotState } from '../../../_graphql/types/graphql.type';
import { useBotState } from '../../../hooks/useBotState';
import { BotStateToggle } from './BotStateToggle';
import { SignOut } from './SignOut';

const navigationPaths: readonly string[] = [
  '/villages',
  '/hero',
  '/settings',
  '/logs',
];

export const Navigation: React.FC = () => {
  const { pathname } = useLocation();
  const [lastVillagesPath, setLastVillagesPath] = useState<string>();

  const botState = useBotState();

  if (!botState) {
    return null;
  }

  const currentItemIndex = navigationPaths.findIndex(path => pathname.startsWith(path));

  if (currentItemIndex === -1) {
    return null;
  }

  const onTabClick = (): void => {
    if (pathname.startsWith('/villages')) {
      setLastVillagesPath(pathname);
    }
  };

  const getTabPath = (index: number, path: string): string => currentItemIndex === index ? '#' : path;

  return (
    <AppBar position="fixed">
      <Tabs
        centered
        indicatorColor="primary"
        value={currentItemIndex}
      >
        <Tab
          component={Link}
          label="Villages"
          to={getTabPath(0, lastVillagesPath || navigationPaths[0])}
        />
        <Tab
          component={Link}
          label="Hero"
          onClick={onTabClick}
          to={getTabPath(1, navigationPaths[1])}
        />
        <Tab
          component={Link}
          label="Settings"
          onClick={onTabClick}
          to={getTabPath(2, navigationPaths[2])}
        />
        <Tab
          component={Link}
          label="Logs"
          onClick={onTabClick}
          to={getTabPath(3, navigationPaths[3])}
        />
        <Tab
          botState={botState}
          component={BotStateToggle}
        />
        {botState === BotState.Paused && (
          <Tab component={SignOut} />
        )}
      </Tabs>
    </AppBar>
  );
};
