import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { Link, Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { GetVillageById, UpdateVillage } from '*/graphql_operations/village.graphql';
import {
  IGetVillageByIdQuery,
  IGetVillageByIdQueryVariables, IUpdateVillageSubscription,
} from '../../../_types/graphql';
import { Buildings } from '../buildings/Buildings';
import { VillageSettings } from '../settings/VillageSettings';
import { IVillageContext, VillageContext } from './context/VillageContext';
import { Resources } from './Resources';

interface IParams {
  readonly villageId: number;
}

export const Village: React.FC<IParams> = (props) => {
  const {
    villageId,
  } = props;

  const match = useRouteMatch();

  const [showSettings, setShowSettings] = useState(false);
  const openSettings = (): void => setShowSettings(true);
  const closeSettings = (): void => setShowSettings(false);

  const { data, loading, refetch } = useQuery<IGetVillageByIdQuery, IGetVillageByIdQueryVariables>(GetVillageById, {
    variables: { villageId },
  });

  useSubscription<IUpdateVillageSubscription>(UpdateVillage, {
    onSubscriptionData: () => refetch(),
  });

  if (loading || !data || !data.village) {
    return null;
  }

  const {
    resources,
  } = data.village;

  const context: IVillageContext = {
    villageId,
  };

  return (
    <VillageContext.Provider value={context}>
      <Resources resources={resources} />
      <button type="button" onClick={openSettings}>
        Settings
      </button>
      <div>
        <Link to={`${match.url}/buildings`}>Buildings</Link>
      </div>
      <Switch>
        <Route path={`${match.path}/buildings`} component={Buildings} />
        <Redirect to={`${match.path}/buildings`} />
      </Switch>
      <Dialog
        open={showSettings}
        onClose={closeSettings}
      >
        <VillageSettings />
      </Dialog>
    </VillageContext.Provider>
  );
};