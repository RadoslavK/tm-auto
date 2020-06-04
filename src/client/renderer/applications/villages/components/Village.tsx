import { Dialog } from '@material-ui/core';
import React, {
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
  useRouteMatch,
} from 'react-router-dom';

import { useRefreshVillageMutation } from '../../../_graphql/graphqlHooks';
import { Buildings } from '../../buildings/Buildings';
import { VillageSettings } from '../../settings/village';
import { Units } from '../../units/components/Units';
import { VillageContext } from '../context/villageContext';
import { useVillage } from '../hooks/useVillage';
import { CrannyCapacity } from './CrannyCapacity';
import { Resources } from './Resources';

type Props = {
  readonly villageId: number;
};

export const Village: React.FC<Props> = ({ villageId }) => {
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
    if (village === null) {
      history.push('/villages');
    }
  }, [village, history]);

  if (!village) {
    return null;
  }

  const { resources } = village;

  return (
    <div>
      <VillageContext.Provider value={{ villageId }}>
        <Resources resources={resources} />
        <CrannyCapacity />
        <button onClick={openSettings}>
          Settings
        </button>
        <button onClick={onRefreshVillage}>
          Refresh
        </button>
        <div>
          <Link to={`${match.url}/buildings`}>Buildings</Link>
          <Link to={`${match.url}/units`}>Units</Link>
        </div>
        <Switch>
          <Route
            component={Buildings}
            path={`${match.path}/buildings`}
          />
          <Route
            component={Units}
            path={`${match.path}/units`}
          />
          <Redirect to={`${match.path}/buildings`} />
        </Switch>
        <Dialog
          onClose={closeSettings}
          open={showSettings}
        >
          <Route
            path={`${match.path}/:tab`}
            render={(routeProps: RouteComponentProps<{ readonly tab: string; }>) => (
              <VillageSettings tab={routeProps.match.params.tab} />
            )}
          />
        </Dialog>
      </VillageContext.Provider>
    </div>
  );
};
