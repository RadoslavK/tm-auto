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

import { Buildings } from '../../buildings/Buildings';
import { VillageSettings } from '../../settings/village';
import { Units } from '../../units/components/Units';
import {
  IVillageContext,
  VillageContext,
} from '../context/villageContext';
import { useGetVillageById } from '../hooks/useGetVillageById';
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

  const villageResult = useGetVillageById(villageId);

  const history = useHistory();

  useEffect(() => {
    if (!villageResult) {
      return;
    }

    if (!villageResult.village) {
      history.push('/villages');
    }
  }, [villageResult, history]);

  if (!villageResult || !villageResult.village) {
    return null;
  }

  const { resources } = villageResult.village;

  const context: IVillageContext = { villageId };

  return (
    <div>
      <VillageContext.Provider value={context}>
        <Resources resources={resources} />
        <CrannyCapacity />
        <button
          onClick={openSettings}
          type="button"
        >
          Settings
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
