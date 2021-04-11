import React, { useMemo } from 'react';
import { useQueryLoader } from 'react-relay/hooks';

import type { HeroQuery } from '../_graphql/__generated__/HeroQuery.graphql.js';
import type { LogsQuery } from '../_graphql/__generated__/LogsQuery.graphql.js';
import type { MapSearchQuery } from '../_graphql/__generated__/MapSearchQuery.graphql.js';
import type { SettingsQuery } from '../_graphql/__generated__/SettingsQuery.graphql.js';
import type { VillagesQuery } from '../_graphql/__generated__/VillagesQuery.graphql.js';
import {
  Hero,
  heroQuery,
} from './hero/components/Hero.js';
import {
  Logs,
  logsQuery,
} from './logs/components/Logs.js';
import {
  MapSearch,
  mapSearchQuery,
} from './mapSearch/MapSearch.js';
import {
  Settings,
  settingsQuery,
} from './settings/Settings.js';
import {
  Villages,
  villagesQuery,
} from './villages/components/Villages.js';

type NavigationPath = 'villages' | 'hero' | 'settings' | 'map-search' | 'logs';

export type NavigationApp = {
  readonly label: string;
  readonly path: NavigationPath;
  readonly preload: () => void;
  readonly element: React.ReactElement | null | undefined;
};

type Props = {
  readonly children: (navigationApps: readonly NavigationApp[]) => React.ReactNode;
};

export const EnsureMainNavigation: React.FC<Props> = ({ children }) => {
  const [logsQueryRef, loadLogsQuery] = useQueryLoader<LogsQuery>(logsQuery);
  const [mapSearchQueryRef, loadMapSearchQuery] = useQueryLoader<MapSearchQuery>(mapSearchQuery);
  const [settingsQueryRef, loadSettingsQuery] = useQueryLoader<SettingsQuery>(settingsQuery);
  const [heroQueryRef, loadHeroQuery] = useQueryLoader<HeroQuery>(heroQuery);
  const [villagesQueryRef, loadVillagesQuery] = useQueryLoader<VillagesQuery>(villagesQuery);

  const navigationApps = useMemo((): readonly NavigationApp[] => [
    {
      label: 'Villages',
      path: 'villages',
      preload: () => loadVillagesQuery({}, { fetchPolicy: 'store-and-network' }),
      element: villagesQueryRef && <Villages queryRef={villagesQueryRef} />,
    },
    {
      label: 'Hero',
      path: 'hero',
      preload: () => loadHeroQuery({}, { fetchPolicy: 'store-and-network' }),
      element: heroQueryRef && <Hero queryRef={heroQueryRef} />,
    },
    {
      label: 'Settings',
      path: 'settings',
      preload: () => loadSettingsQuery({}, { fetchPolicy: 'store-and-network' }),
      element: settingsQueryRef && <Settings queryRef={settingsQueryRef} />,
    },
    {
      label: 'Search map',
      path: 'map-search',
      preload: () => loadMapSearchQuery({}, { fetchPolicy: 'store-and-network' }),
      element: mapSearchQueryRef && <MapSearch queryRef={mapSearchQueryRef} />,
    },
    {
      label: 'Logs',
      path: 'logs',
      preload: () => loadLogsQuery({}, { fetchPolicy: 'store-and-network' }),
      element: logsQueryRef && <Logs queryRef={logsQueryRef} />,
    },
  ], [villagesQueryRef, loadVillagesQuery, heroQueryRef, loadHeroQuery, logsQueryRef, loadLogsQuery, loadMapSearchQuery, mapSearchQueryRef, loadSettingsQuery, settingsQueryRef]);

  return <>{children(navigationApps)}</>;
};

EnsureMainNavigation.displayName = 'EnsureMainNavigation';