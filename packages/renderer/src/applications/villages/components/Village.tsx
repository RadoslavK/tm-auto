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
  useRelayEnvironment,
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
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
} from 'relay-runtime';

import type { VillageQuery } from '../../../_graphql/__generated__/VillageQuery.graphql.js';
import type { VillageRefreshVillageMutation } from '../../../_graphql/__generated__/VillageRefreshVillageMutation.graphql.js';
import type { VillageSubscription } from '../../../_graphql/__generated__/VillageSubscription.graphql.js';
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
import { Units } from '../../units/components/Units.js';
import { CrannyCapacity } from './CrannyCapacity.js';
import { Resources } from './Resources.js';
import { VillageTasksActivity } from './VillageTasksActivity.js';

type NavigationItem = {
  readonly label: string;
  readonly component: React.ComponentType<any>;
  readonly path: string;
  readonly tabType?: VillageSettingsTabType;
};

const navigation: readonly NavigationItem[] = [
  {
    label: 'Buildings',
    path: 'buildings',
    component: Buildings,
    tabType: VillageSettingsTabType.AutoBuild,
  },
  {
    label: 'Units',
    path: 'units',
    component: Units,
    tabType: VillageSettingsTabType.AutoUnits,
  },
  {
    label: 'Parties',
    path: 'parties',
    component: Parties,
    tabType: VillageSettingsTabType.AutoParty,
  },
  { label: 'Tasks', path: 'tasks-activity', component: VillageTasksActivity },
] as const;

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

const villageSelectedVillageIdQuery = graphql`
  query VillageSelectedVillageIdQuery {
      ... on Query { __typename }
      selectedVillageId
  }
`;

export const Village: React.FC<Props> = ({ villageId }) => {
  const relayEnvironment = useRelayEnvironment();

  const {
    buildingsQueryRef,
    refreshBuildingSpots,
  } = useBuildingsQuery();

  const prevVillageId = usePrevious(villageId);

  useEffect(() => {
    if (villageId !== prevVillageId) {
      refreshBuildingSpots(villageId, true);
    }
  }, [refreshBuildingSpots,  villageId, prevVillageId]);

  useEffect(() => {
    const request = getRequest(villageSelectedVillageIdQuery);
    const operation = createOperationDescriptor(request, {});
    relayEnvironment.retain(operation);
  }, [relayEnvironment]);

  useEffect(() => {
    commitLocalUpdate(relayEnvironment, store => {
      store.getRoot().setValue(villageId, 'selectedVillageId');
    });
  }, [relayEnvironment, villageId]);

  const match = useRouteMatch();

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

  const { village } = useLazyLoadQuery<VillageQuery>(villageQuery, { villageId });

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
  }, []);

  const location = useLocation();

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
      <Resources resources={village.resources} />
      <CrannyCapacity villageId={village.id} />
      {showSettingsButton && <button onClick={openSettings}>Settings</button>}
      <button onClick={onRefreshVillage}>Refresh</button>
      <div>
        {navigation.map((n) => (
          <Link key={n.path} to={`${match.url}/${n.path}`}>
            <span
              onMouseEnter={() => {
                if (n.path !== 'buildings') {
                  return;
                }

                refreshBuildingSpots(villageId);
              }}
            >
              {n.label}
            </span>
          </Link>
        ))}
      </div>
      <Suspense fallback={null}>
        <Switch>
          {navigation.map((n) => {
            return n.path !== 'buildings'
              ? (
                <Route
                  key={n.path}
                  component={n.component}
                  path={`${match.path}/${n.path}`}
                />
              )
              : (
                <Route
                  key={n.path}
                  path={`${match.path}/${n.path}`}
                  render={() => buildingsQueryRef && (
                    <Buildings
                      key={n.path}
                      buildingsQueryRef={buildingsQueryRef}
                      refreshBuildingSpots={refreshBuildingSpots}
                      villageId={villageId}
                    />
                  )}
                />
              );
          })}
          <Redirect to={`${match.path}/${navigation[0].path}`} />
        </Switch>
      </Suspense>
      <Dialog onClose={closeSettings} open={showSettings}>
        <Route
          path={`${match.path}/:tab`}
          render={(props) => {
            const { tab } = props.match.params;

            return (
              <VillageSettings
                getTabType={getTabType}
                tab={tab!}
                villageId={villageId}
              />
            );
          }}
        />
      </Dialog>
    </div>
  );
};
