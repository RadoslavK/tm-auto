import {
  AppBar,
  Tab,
  Tabs, 
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useMemo,
  useState,
} from 'react';
import { useSubscription } from 'react-relay/hooks';
import {
  Link,
  useLocation, 
} from 'react-router-dom';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { NavigationQuery } from '../../../_graphql/__generated__/NavigationQuery.graphql.js';
import type { NavigationSubscription } from '../../../_graphql/__generated__/NavigationSubscription.graphql.js';
import { useLazyLoadQuery } from '../../../_shared/hooks/useLazyLoadQuery.js';
import type { NavigationApp } from '../../EnsureMainNavigation.js';
import { BotStateToggle } from './BotStateToggle.js';
import { SignOut } from './SignOut.js';

const navigationQuery = graphql`
  query NavigationQuery {
      botState
  }
`;

const navigationSubscription = graphql`
  subscription NavigationSubscription {
      botStateChanged
  }
`;

type Props = {
  readonly navigationApps: readonly NavigationApp[];
};

export const Navigation: React.FC<Props> = ({ navigationApps }) => {
  const { pathname } = useLocation();
  const [lastVillagesPath, setLastVillagesPath] = useState<string>();

  const { botState } = useLazyLoadQuery<NavigationQuery>(navigationQuery, {}, { fetchPolicy: 'store-and-network' });
  
  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<NavigationSubscription> => ({
    subscription: navigationSubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.botStateChanged, 'botState');
    },
  }), []);

  useSubscription(subscriptionConfig);

  const currentItemIndex = navigationApps.findIndex((app) => pathname.startsWith(`/${app.path}`));

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
            onMouseEnter={app.preload}
            to={getTabPath(
              index,
              index !== 0
                ? `/${navigationApps[index].path}`
                : lastVillagesPath || `/${navigationApps[index].path}`,
            )}
          />
        ))}
        <Tab botState={botState} component={BotStateToggle} />
        {botState === 'Paused' && <Tab component={SignOut} />}
      </Tabs>
    </AppBar>
  );
};

Navigation.displayName = 'Navigation';