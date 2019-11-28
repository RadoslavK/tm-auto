import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import React, {
  useContext,
  useEffect,
} from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  useRouteMatch,
} from 'react-router-dom';

import {
  GetVillages,
  UpdateVillages,
} from '*/graphql_operations/village.graphql';

import {
  IGetVillagesQuery,
  IUpdateVillagesSubscription,
} from '../../../_types/graphql';
import {
  ISideMenuContext,
  SideMenuContext,
} from '../sideMenu/context/sideMenuContext';
import { Village } from './Village';

interface IVillageRouteParams {
  readonly id: string;
}

export const Villages: React.FC = () => {
  const match = useRouteMatch();
  const { setItems, items } = useContext<ISideMenuContext>(SideMenuContext);

  const { data, loading, refetch } = useQuery<IGetVillagesQuery>(GetVillages);

  useSubscription<IUpdateVillagesSubscription>(UpdateVillages, {
    onSubscriptionData: () => refetch(),
  });

  useEffect(() => {
    const navigationItems = data
      ? data.villages.map(village => ({
        text: village.name,
        path: `${match.url}/${village.id}`,
      }))
      : [];

    setItems(navigationItems);

    return () => setItems([]);
  }, [setItems, data, match.url]);

  if (loading) {
    return null;
  }

  return (
    <Switch>
      <Route path={`${match.path}/:id`} render={(props: RouteComponentProps<IVillageRouteParams>) => <Village villageId={+props.match.params.id} />} />
      {items.length > 0 && (
        <Redirect to={items[0].path} />
      )}
    </Switch>
  );
};
