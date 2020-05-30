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
import { Logs } from '../../logs/components/Logs';
import { Mentor } from '../../mentor/Mentor';
import { GeneralSettings } from '../../settings/GeneralSettings';
import { HeroSettings } from '../../settings/hero/HeroSettings';
import { Villages } from '../../villages/components/Villages';
import { BotStateToggle } from './BotStateToggle';
import { SignOut } from './SignOut';

type NavigationApp = {
  readonly component: React.ComponentType;
  readonly label: string;
  readonly path: string;
};

export const navigationApps: readonly NavigationApp[] = [
  { component: Villages, label: 'Villages', path: '/villages' },
  { component: HeroSettings, label: 'Hero', path: '/hero' },
  { component: GeneralSettings, label: 'Settings', path: '/settings' },
  { component: Mentor, label: 'Mentor', path: '/mentor' },
  { component: Logs, label: 'Logs', path: '/logs' },
];

export const Navigation: React.FC = () => {
  const { pathname } = useLocation();
  const [lastVillagesPath, setLastVillagesPath] = useState<string>();

  const botState = useBotState();

  if (!botState) {
    return null;
  }

  const currentItemIndex = navigationApps.findIndex(app => pathname.startsWith(app.path));

  if (currentItemIndex === -1) {
    return null;
  }

  const markLastVillagePath = (): void => {
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
        {navigationApps.map((app, index) => (
          <Tab
            key={app.path}
            component={Link}
            label={app.label}
            onClick={index === 0 ? undefined : markLastVillagePath}
            to={getTabPath(index, index === 0
              ? navigationApps[0].path
              : lastVillagesPath || navigationApps[index].path)}
          />
        ))}
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
