import {
  Dialog,
  makeStyles,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
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
  useNavigate,
} from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import type { VillageQuery } from '../../../_graphql/__generated__/VillageQuery.graphql.js';
import type { VillageRefreshVillageMutation } from '../../../_graphql/__generated__/VillageRefreshVillageMutation.graphql.js';
import type { VillageSettingsQuery } from '../../../_graphql/__generated__/VillageSettingsQuery.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { villageTribeState } from '../../../_recoil/atoms/tribe.js';
import { usePrevious } from '../../../_shared/hooks/usePrevious.js';
import {
  Academy,
  useAcademyQuery,
} from '../../academy/Academy.js';
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
import {
  GeneralVillageOverview,
  useGeneralVillageOverviewQuery,
} from './GeneralVillageOverview.js';
import { VillageResources } from './VillageResources.js';
import type { VillageRouteParams } from './Villages.js';

const navigationPaths = ['buildings', 'units', 'parties', 'academy', 'smithy', 'general'] as const;
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
        tribe
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

const useStyles = makeStyles({
  root: {
    flex: 1,
  },
  tab: {
    marginRight: 8,
  },
  activeTab: {
    color: 'green',
  },
});

type Props = {
  readonly queryRef: PreloadedQuery<VillageQuery>;
};

export const Village: React.FC<Props> = ({ queryRef }) => {
  const classes = useStyles();
  const villageId = (useParams() as VillageRouteParams).id;

  const { buildingsQueryRef, reloadBuildingsQuery } = useBuildingsQuery();
  const { unitSettingsQueryRef, reloadUnitSettingsQuery } = useUnitsQuery();
  const { partiesQueryRef, reloadPartiesQuery } = usePartiesQuery();
  const { smithyQueryRef, reloadSmithyQuery } = useSmithyQuery();
  const { academyQueryRef, reloadAcademyQuery } = useAcademyQuery();
  const { reloadGeneralVillageOverviewQuery, generalVillageOverviewQueryRef } = useGeneralVillageOverviewQuery();

  const prevVillageId = usePrevious(villageId);
  const currentTab = useMatch('/villages/:id/:tab/*')?.params.tab as NavigationPath | undefined;
  const prevTab = usePrevious(currentTab);

  useEffect(() => {
    if (villageId === prevVillageId && (prevTab || !currentTab)) {
      return;
    }

    switch (currentTab) {
      case 'buildings': reloadBuildingsQuery(villageId); break;
      case 'units': reloadUnitSettingsQuery(villageId); break;
      case 'parties': reloadPartiesQuery(villageId); break;
      case 'smithy': reloadSmithyQuery(villageId); break;
      case 'academy': reloadAcademyQuery(villageId); break;
      case 'general': reloadGeneralVillageOverviewQuery(villageId); break;
    }
  }, [reloadBuildingsQuery, reloadUnitSettingsQuery, currentTab, prevTab, villageId, prevVillageId, reloadPartiesQuery, reloadGeneralVillageOverviewQuery, reloadSmithyQuery, reloadAcademyQuery]);

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
      label: 'Academy',
      path: 'academy',
      tabType: VillageSettingsTabType.AutoAcademy,
      preloadData: () => reloadAcademyQuery(villageId),
    },
    {
      label: 'Smithy',
      path: 'smithy',
      tabType: VillageSettingsTabType.AutoSmithy,
      preloadData: () => reloadSmithyQuery(villageId),
    },
    {
      label: 'General',
      path: 'general',
      tabType: VillageSettingsTabType.General,
      preloadData: () => reloadGeneralVillageOverviewQuery(villageId),
    },
  ], [villageId, reloadBuildingsQuery, reloadUnitSettingsQuery, reloadPartiesQuery, reloadSmithyQuery, reloadAcademyQuery, reloadGeneralVillageOverviewQuery]);

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
  const setVillageTribe = useSetRecoilState(villageTribeState);

  useEffect(() => {
    if (village === null) {
      navigate('..');
    } else {
      setVillageTribe(village.tribe);
    }
  }, [village, navigate, setVillageTribe]);

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

      case 'academy':
        return academyQueryRef && <Academy queryRef={academyQueryRef} />;

      case 'smithy':
        return smithyQueryRef && <Smithy queryRef={smithyQueryRef} />;

      case 'general':
        return generalVillageOverviewQueryRef && <GeneralVillageOverview queryRef={generalVillageOverviewQueryRef} />;

      default:
        throw new Error(`Did not find component for path ${n.path}`);
    }
  };

  return (
    <div className={classes.root}>
      <Suspense fallback={null}>
        <VillageResources resources={village.resources} />
        <CrannyCapacity crannyCapacityKey={crannyCapacity} />
      </Suspense>
      {showSettingsButton && <button onClick={openSettings}>Settings</button>}
      <button onClick={onRefreshVillage}>Refresh</button>
      <div>
        {navigation.map((n) => {
          const isTabActive = n.path === currentTab;

          return (
            <Link className={clsx(classes.tab, isTabActive && classes.activeTab)} key={n.path} to={n.path}>
              <span onMouseEnter={n.preloadData}>{n.label}</span>
            </Link>
          );
        })}
      </div>
      <Routes>
        {navigation.map((n) => (
          <Route
            key={n.path}
            path={`${n.path}/*`}
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