import { GetVillageById, UpdateVillage } from '*/graphql_operations/village.graphql';
import { Dialog } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, { useState } from 'react';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import useRouter from 'use-react-router';
import {
  IGetVillageByIdQuery,
  IGetVillageByIdQueryVariables, IUpdateVillageSubscription, IUpdateVillageSubscriptionVariables,
} from '../../_types/graphql';
import { Buildings } from '../buildings/Buildings';
import { VillageSettings } from '../settings/VillageSettings';
import { IVillageContext, VillageContext } from './context/VillageContext';
import { Resources } from './Resources';

interface IParams {
  readonly villageId: number;
}

export const Village: React.FunctionComponent<IParams> = (props) => {
  const {
    villageId,
  } = props;

  const { match } = useRouter();

  const [showSettings, setShowSettings] = useState(false);
  const openSettings = () => setShowSettings(true);
  const closeSettings = () => setShowSettings(false);

  const { data, loading, refetch } = useQuery<IGetVillageByIdQuery, IGetVillageByIdQueryVariables>(GetVillageById, {
    variables: { villageId },
    fetchPolicy: 'network-only',
  });

  useSubscription<IUpdateVillageSubscription, IUpdateVillageSubscriptionVariables>(UpdateVillage, {
    variables: { villageId },
    fetchPolicy: 'network-only',
    onSubscriptionData: () => refetch({ villageId }),
  });

  if (loading || !data.village) {
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
      <button onClick={openSettings}>
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
