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
  useLazyLoadQuery,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { VillageQuery } from '../../../_graphql/__generated__/VillageQuery.graphql.js';
import type { VillageRefreshVillageMutation } from '../../../_graphql/__generated__/VillageRefreshVillageMutation.graphql.js';
import type { VillageSubscription } from '../../../_graphql/__generated__/VillageSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { usePrevious } from '../../../_shared/hooks/usePrevious.js';
import {
  Buildings,
  useBuildingsQuery,
} from '../../buildings/Buildings.js';
import { Parties } from '../../party/Parties.js';
import {
  VillageSettings,
  VillageSettingsTabType,
} from '../../settings/village/VillageSettings.js';
import {
  Units,
  useUnitsQuery,
} from '../../units/components/Units.js';
import { CrannyCapacity } from './CrannyCapacity.js';
import { Resources } from './Resources.js';
import { VillageTasksActivity } from './VillageTasksActivity.js';

const navigationPaths = ['buildings', 'units', 'parties', 'tasks-activity'] as const;
type NavigationPath = typeof navigationPaths[number];

type NavigationItem = {
  readonly label: string;
  readonly path: NavigationPath;
  readonly tabType?: VillageSettingsTabType;
  readonly preloadData?: () => void;
};

type Props = {
  readonly villageId: string;
};

const villageRefreshVillageMutation = graphql`
  mutation VillageRefreshVillageMutation($villageId: ID!) {
      refreshVillage(villageId: $villageId)
  }
`;

const villageQuery = graphql`
  query VillageQuery($villageId: ID!) {
      village(villageId: $villageId) {
          id
          resources {
              ...Resources_villageResources
          }
      }
  }
`;

const villageSubscription = graphql`
  subscription VillageSubscription($villageId: ID!) {
      villageUpdated(villageId: $villageId) {
          id
          resources {
              ...Resources_villageResources
          }
      }
  }
`;

export const Village: React.FC<Props> = ({ villageId }) => {
  const { buildingsQueryRef, reloadBuildingsQuery } = useBuildingsQuery();
  const { unitSettingsQueryRef, reloadUnitSettingsQuery } = useUnitsQuery();
  const match = useRouteMatch();
  const location = useLocation();
  const prevVillageId = usePrevious(villageId);

  useEffect(() => {
    if (villageId === prevVillageId) {
      return;
    }

    if (location.pathname.endsWith(match.url)) {
      reloadBuildingsQuery(villageId);
    }
    if (location.pathname.endsWith('buildings' as NavigationPath)) {
      reloadBuildingsQuery(villageId);
    }
    if (location.pathname.endsWith('units' as NavigationPath)) {
      reloadUnitSettingsQuery(villageId);
    }
  }, [reloadBuildingsQuery, reloadUnitSettingsQuery, villageId, prevVillageId, location.pathname, match.url]);

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
    },
    {
      label: 'Tasks',
      path: 'tasks-activity',
    },
  ], [villageId, reloadBuildingsQuery, reloadUnitSettingsQuery]);

  const [showSettings, setShowSettings] = useState(false);
  const openSettings = (): void => setShowSettings(true);
  const closeSettings = (): void => setShowSettings(false);

  const history = useHistory();

  const [refreshVillage] = useMutation<VillageRefreshVillageMutation>(villageRefreshVillageMutation);

  const onRefreshVillage = () => {
    refreshVillage({
      variables: { villageId },
    });
  };

  const { village } = useLazyLoadQuery<VillageQuery>(villageQuery, { villageId }, { fetchPolicy: 'store-and-network' });

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<VillageSubscription> => ({
    subscription: villageSubscription,
    variables: { villageId },
  }), [villageId]);

  useSubscription(subscriptionConfig);

  useEffect(() => {
    if (village === null) {
      history.push('/villages');
    }
  }, [village, history]);

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

  const currentNavMatch = new RegExp(`${match.url}/(.*)/?`).exec(
    location.pathname,
  );
  const currentNav = currentNavMatch && currentNavMatch[1];
  const showSettingsButton =
    navigation.find((x) => x.path === currentNav)?.tabType !== undefined;

  return (
    <div>
      <Suspense fallback={null}>
        <Resources resources={village.resources} />
        <CrannyCapacity />
      </Suspense>
      {showSettingsButton && <button onClick={openSettings}>Settings</button>}
      <button onClick={onRefreshVillage}>Refresh</button>
      <div>
        {navigation.map((n) => (
          <Link key={n.path} to={`${match.url}/${n.path}`}>
            <span onMouseEnter={n.preloadData}>
              {n.label}
            </span>
          </Link>
        ))}
      </div>
      <Switch>
        {navigation.map((n) => (
          <Route
            key={n.path}
            path={`${match.path}/${n.path}`}
            render={() => {
              switch (n.path) {
                case 'buildings':
                  return buildingsQueryRef && (
                    <Suspense fallback={null}>
                      <Buildings
                        buildingsQueryRef={buildingsQueryRef}
                      />
                    </Suspense>
                  );

                case 'units':
                  return unitSettingsQueryRef && (
                    <Suspense fallback={null}>
                      <Units unitSettingsQueryRef={unitSettingsQueryRef} />
                    </Suspense>
                  );

                case 'parties':
                  return <Parties />;

                case 'tasks-activity':
                  return <VillageTasksActivity />;

                default:
                  throw new Error(`Did not find component for path ${n.path}`);
              }
            }}
          />
        ))}
        <Redirect to={`${match.path}/${navigation[0].path}`} />
      </Switch>
      <Dialog onClose={closeSettings} open={showSettings}>
        <Route
          path={`${match.path}/:tab`}
          render={(props) => {
            const { tab } = props.match.params;

            return (
              <VillageSettings
                getTabType={getTabType}
                tab={tab!}
              />
            );
          }}
        />
      </Dialog>
    </div>
  );
};

Village.displayName = 'Village';