import { Dialog } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Link,
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

import { updateSelectedVillageId } from '../../../_graphql/cache/cache';
import { useRefreshVillageMutation } from '../../../_graphql/graphqlHooks';
import { Buildings } from '../../buildings/Buildings';
import { Parties } from '../../party/Parties';
import {
  VillageSettings,
  VillageSettingsTabType,
} from '../../settings/village';
import { Units } from '../../units/components/Units';
import { useVillage } from '../hooks/useVillage';
import { CrannyCapacity } from './CrannyCapacity';
import { Resources } from './Resources';
import { VillageTasksActivity } from './VillageTasksActivity';

type NavigationItem = {
  readonly label: string;
  readonly component: React.ComponentType;
  readonly path: string;
  readonly tabType?: VillageSettingsTabType;
};

const navigation: readonly NavigationItem[] = [
  { label: 'Buildings', path: 'buildings', component: Buildings, tabType: VillageSettingsTabType.AutoBuild },
  { label: 'Units', path: 'units', component: Units, tabType: VillageSettingsTabType.AutoUnits },
  { label: 'Parties', path: 'parties', component: Parties, tabType: VillageSettingsTabType.AutoParty },
  { label: 'Tasks', path: 'tasks-activity', component: VillageTasksActivity },
];

type Props = {
  readonly villageId: string;
};

export const Village: React.FC<Props> = ({ villageId }) => {
  useEffect(() => {
    updateSelectedVillageId(villageId);

    return () => updateSelectedVillageId('');
  }, [villageId]);

  const match = useRouteMatch();

  const [showSettings, setShowSettings] = useState(false);
  const openSettings = (): void => setShowSettings(true);
  const closeSettings = (): void => setShowSettings(false);

  const village = useVillage(villageId);

  const history = useHistory();

  const [refreshVillage] = useRefreshVillageMutation({ variables: { villageId } });

  const onRefreshVillage = () => {
    refreshVillage();
  };

  useEffect(() => {
    if (village === undefined) {
      history.push('/villages');
    }
  }, [village, history]);

  const getTabType = useCallback((tab: string): VillageSettingsTabType => {
    const navPart = navigation.find(n => n.path === tab);

    if (!navPart) {
      throw new Error(`Unknown tab type for path: ${tab} request`);
    }

    if (navPart.tabType === undefined) {
      throw new Error(`Request tab type for path that has none! path: ${tab}`);
    }

    return navPart.tabType;
  }, []);

  const location = useLocation();

  if (!village) {
    return null;
  }

  const { resources } = village;

  const currentNavMatch = new RegExp(`${match.url}/(.*)/?`).exec(location.pathname);
  const currentNav = currentNavMatch && currentNavMatch[1];
  const showSettingsButton = navigation.find(x => x.path === currentNav)?.tabType !== undefined;

  return (
    <div>
      <Resources resources={resources} />
      <CrannyCapacity />
      {showSettingsButton && (
        <button onClick={openSettings}>
          Settings
        </button>
      )}
      <button onClick={onRefreshVillage}>
        Refresh
      </button>
      <div>
        {navigation.map((n) => (
          <Link
            key={n.path}
            to={`${match.url}/${n.path}`}
          >
            {n.label}
          </Link>
        ))}
      </div>
      <Switch>
        {navigation.map((n) => (
          <Route
            key={n.path}
            component={n.component}
            path={`${match.path}/${n.path}`}
          />
        ))}
        <Redirect to={`${match.path}/${navigation[0].path}`} />
      </Switch>
      <Dialog
        onClose={closeSettings}
        open={showSettings}
      >
        <Route
          path={`${match.path}/:tab`}
          render={(routeProps: RouteComponentProps<{ readonly tab: string; }>) => (
            <VillageSettings
              getTabType={getTabType}
              tab={routeProps.match.params.tab}
            />
          )}
        />
      </Dialog>
    </div>
  );
};
