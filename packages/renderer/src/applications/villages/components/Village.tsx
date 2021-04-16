import { Dialog } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay/hooks';
import {
  useMatch,
  useParams,
} from 'react-router';
import {
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import type { VillageQuery } from '../../../_graphql/__generated__/VillageQuery.graphql.js';
import type { VillageRefreshVillageMutation } from '../../../_graphql/__generated__/VillageRefreshVillageMutation.graphql.js';
import type { VillageSettingsQuery } from '../../../_graphql/__generated__/VillageSettingsQuery.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { usePrevious } from '../../../_shared/hooks/usePrevious.js';
import {
  Buildings,
  useBuildingsQuery,
} from '../../buildings/Buildings.js';
import {
  Parties,
  usePartiesQuery,
} from '../../party/Parties.js';
import {
  VillageSettings,
  villageSettingsQuery,
  VillageSettingsTabType,
} from '../../settings/village/VillageSettings.js';
import {
  Smithy,
  useSmithyQuery,
} from '../../smithy/Smithy.js';
import {
  Units,
  useUnitsQuery,
} from '../../units/components/Units.js';
import { CrannyCapacity } from './CrannyCapacity.js';
import { VillageResources } from './VillageResources.js';
import type { VillageRouteParams } from './Villages.js';
import {
  useVillageTasksActivityQuery,
  VillageTasksActivity,
} from './VillageTasksActivity.js';

const navigationPaths = ['buildings', 'units', 'parties', 'smithy', 'tasks-activity'] as const;
type NavigationPath = typeof navigationPaths[number];

type NavigationItem = {
  readonly label: string;
  readonly path: NavigationPath;
  readonly tabType?: VillageSettingsTabType;
  readonly preloadData?: () => void;
};

const villageRefreshVillageMutation = graphql`
  mutation VillageRefreshVillageMutation($villageId: ID!) {
      refreshVillage(villageId: $villageId)
  }
`;

graphql`
    fragment Village_village on Village {
        resources {
            ...VillageResources_villageResources
        }
    }
`;

export const villageQuery = graphql`
    query VillageQuery($villageId: ID!) {
        village(villageId: $villageId) {
           ...Village_village @relay(mask: false)
        }
        crannyCapacity(villageId: $villageId) {
            ...CrannyCapacity_crannyCapacity
        }
    }
`;

type Props = {
  readonly queryRef: PreloadedQuery<VillageQuery>;
};

export const Village: React.FC<Props> = ({ queryRef }) => {
  const villageId = (useParams() as VillageRouteParams).id;

  const { buildingsQueryRef, reloadBuildingsQuery } = useBuildingsQuery();
  const { unitSettingsQueryRef, reloadUnitSettingsQuery } = useUnitsQuery();
  const { partiesQueryRef, reloadPartiesQuery } = usePartiesQuery();
  const { smithyQueryRef, reloadSmithyQuery } = useSmithyQuery();
  const { reloadVillageTasksActivityQuery, villageTasksActivityQueryRef } = useVillageTasksActivityQuery();

  const { pathname } = useLocation();
  const prevVillageId = usePrevious(villageId);
  const currentTab = useMatch('/villages/:id/:tab')?.params.tab;
  const isTabSelected = !!currentTab;

  useEffect(() => {
    if (villageId === prevVillageId) {
      return;
    }

    if (!isTabSelected || pathname.endsWith('buildings' as NavigationPath)) {
      reloadBuildingsQuery(villageId);
    }
    if (pathname.endsWith('units' as NavigationPath)) {
      reloadUnitSettingsQuery(villageId);
    }
    if (pathname.endsWith('parties' as NavigationPath)) {
      reloadPartiesQuery(villageId);
    }
    if (pathname.endsWith('smithy' as NavigationPath)) {
      reloadSmithyQuery(villageId);
    }
    if (pathname.endsWith('tasks-activity' as NavigationPath)) {
      reloadVillageTasksActivityQuery(villageId);
    }
  }, [isTabSelected, reloadBuildingsQuery, reloadUnitSettingsQuery, villageId, prevVillageId, pathname, reloadPartiesQuery, reloadVillageTasksActivityQuery, reloadSmithyQuery]);

  const setSelectedVillageId = useSetRecoilState(selectedVillageIdState);

  useEffect(() => {
    setSelectedVillageId(villageId);
  }, [setSelectedVillageId, villageId]);

  const navigation = useMemo((): readonly NavigationItem[] => [
    {
      label: 'Buildings',
      path: 'buildings',
      tabType: VillageSettingsTabType.AutoBuild,
      preloadData: () => reloadBuildingsQuery(villageId),
    },
    {
      label: 'Units',
      path: 'units',
      tabType: VillageSettingsTabType.AutoUnits,
      preloadData: () => reloadUnitSettingsQuery(villageId),
    },
    {
      label: 'Parties',
      path: 'parties',
      tabType: VillageSettingsTabType.AutoParty,
      preloadData: () => reloadPartiesQuery(villageId),
    },
    {
      label: 'Smithy',
      path: 'smithy',
      tabType: VillageSettingsTabType.AutoSmithy,
      preloadData: () => reloadSmithyQuery(villageId),
    },
    {
      label: 'Tasks',
      path: 'tasks-activity',
    },
  ], [villageId, reloadBuildingsQuery, reloadUnitSettingsQuery, reloadPartiesQuery, reloadSmithyQuery]);

  const [villageSettingsQueryRef, loadVillageSettingsQuery] = useQueryLoader<VillageSettingsQuery>(villageSettingsQuery);

  const [showSettings, setShowSettings] = useState(false);
  const openSettings = (): void => {
    loadVillageSettingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
    setShowSettings(true);
  };
  const closeSettings = (): void => setShowSettings(false);

  const navigate = useNavigate();

  const [refreshVillage] = useMutation<VillageRefreshVillageMutation>(villageRefreshVillageMutation);

  const onRefreshVillage = () => {
    refreshVillage({
      variables: { villageId },
    });
  };

  const { village, crannyCapacity } = usePreloadedQuery(villageQuery, queryRef);

  useEffect(() => {
    if (village === null) {
      navigate('..');
    }
  }, [village, navigate]);

  const getTabType = useCallback((tab: string): VillageSettingsTabType => {
    const navPart = navigation.find((n) => n.path === tab);

    if (!navPart) {
      throw new Error(`Unknown tab type for path: ${tab} request`);
    }

    if (navPart.tabType === undefined) {
      throw new Error(`Request tab type for path that has none! path: ${tab}`);
    }

    return navPart.tabType;
  }, [navigation]);

  if (village === null) {
    return null;
  }

  const showSettingsButton =
    navigation.find((x) => x.path === currentTab)?.tabType !== undefined;

  const getTabElement = (n: NavigationItem) => {
    switch (n.path) {
      case 'buildings':
        return buildingsQueryRef && (
          <Buildings buildingsQueryRef={buildingsQueryRef} />
        );

      case 'units':
        return unitSettingsQueryRef && (
          <Units unitSettingsQueryRef={unitSettingsQueryRef} />
        );

      case 'parties':
        return partiesQueryRef && <Parties queryRef={partiesQueryRef} />;

      case 'smithy':
        return smithyQueryRef && <Smithy queryRef={smithyQueryRef} />;

      case 'tasks-activity':
        return villageTasksActivityQueryRef && <VillageTasksActivity queryRef={villageTasksActivityQueryRef} />;

      default:
        throw new Error(`Did not find component for path ${n.path}`);
    }
  };

  return (
    <div>
      <Suspense fallback={null}>
        <VillageResources resources={village.resources} />
        <CrannyCapacity crannyCapacityKey={crannyCapacity} />
      </Suspense>
      {showSettingsButton && <button onClick={openSettings}>Settings</button>}
      <button onClick={onRefreshVillage}>Refresh</button>
      <div>
        {navigation.map((n) => (
          <Link key={n.path} to={n.path}>
            <span onMouseEnter={n.preloadData}>{n.label}</span>
          </Link>
        ))}
      </div>
      <Routes>
        {navigation.map((n) => (
          <Route
            key={n.path}
            path={n.path}
            element={(
              <Suspense fallback={null}>
                {getTabElement(n)}
              </Suspense>
            )}
          />
        ))}
        <Route path="*" element={<Navigate to={navigation[0].path} />} />
      </Routes>
      <Dialog onClose={closeSettings} open={showSettings}>
        {villageSettingsQueryRef && <VillageSettings getTabType={getTabType} tab={currentTab || navigation[0].path} queryRef={villageSettingsQueryRef} />}
      </Dialog>
    </div>
  );
};

Village.displayName = 'Village';