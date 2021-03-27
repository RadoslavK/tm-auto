import {
  AppBar,
  Tab,
  Tabs, 
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import {
  Link,
  useLocation, 
} from 'react-router-dom';

import type { NavigationQuery } from '../../../_graphql/__generated__/NavigationQuery.graphql.js';
import { Hero } from '../../hero/components/Hero.js';
import { Logs } from '../../logs/components/Logs.js';
import { MapSearch } from '../../mapSearch/MapSearch.js';
import { Settings } from '../../settings/Settings.js';
import { Villages } from '../../villages/components/Villages.js';
import { BotStateToggle } from './BotStateToggle.js';
import { SignOut } from './SignOut.js';

type NavigationApp = {
  readonly component: React.ComponentType;
  readonly label: string;
  readonly path: string;
};

export const navigationApps: readonly NavigationApp[] = [
  { component: Villages, label: 'Villages', path: '/villages' },
  { component: Hero, label: 'Hero', path: '/hero' },
  { component: Settings, label: 'Settings', path: '/settings' },
  { component: MapSearch, label: 'Search map', path: '/map-search' },
  { component: Logs, label: 'Logs', path: '/logs' },
];

const navigationQuery = graphql`
  query NavigationQuery {
      botState
  }
`;

export const Navigation: React.FC = () => {
  const { pathname } = useLocation();
  const [lastVillagesPath, setLastVillagesPath] = useState<string>();

  const { botState } = useLazyLoadQuery<NavigationQuery>(navigationQuery, {});

  const currentItemIndex = navigationApps.findIndex((app) =>
    pathname.startsWith(app.path),
  );

  if (currentItemIndex === -1) {
    return null;
  }

  const markLastVillagePath = (): void => {
    if (pathname.startsWith('/villages')) {
      setLastVillagesPath(pathname);
    }
  };

  const getTabPath = (index: number, path: string): string =>
    currentItemIndex === index ? '#' : path;

  return (
    <AppBar position="fixed">
      <Tabs centered indicatorColor="primary" value={currentItemIndex}>
        {navigationApps.map((app, index) => (
          <Tab
            key={app.path}
            component={Link}
            label={app.label}
            onClick={index === 0 ? undefined : markLastVillagePath}
            to={getTabPath(
              index,
              index !== 0
                ? navigationApps[index].path
                : lastVillagesPath || navigationApps[index].path,
            )}
          />
        ))}
        <Tab botState={botState} component={BotStateToggle} />
        {botState === 'Paused' && <Tab component={SignOut} />}
      </Tabs>
    </AppBar>
  );
};