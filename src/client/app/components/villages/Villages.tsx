import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import { Redirect, Route, RouteComponentProps, Switch, useRouteMatch } from 'react-router-dom';
import {
  GetVillages,
  UpdateVillages,
} from '*/graphql_operations/village.graphql';
import {
  IGetVillagesQuery,
  IUpdateVillagesSubscription,
} from '../../../_types/graphql';
import { ISideMenuContext, SideMenuContext } from '../sideMenu/context/SideMenuContext';
import { Village } from './Village';

interface IVillageRouteParams {
  readonly id: string;
}

export const Villages: React.FunctionComponent = () => {
  const match = useRouteMatch();
  const { setItems } = useContext<ISideMenuContext>(SideMenuContext);
  const [villages, setVillages] = useState<IGetVillagesQuery['villages']>([]);

  const { data, loading } = useQuery<IGetVillagesQuery>(GetVillages,
  {
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    if (loading || !data) {
      return;
    }

    setVillages(data.villages);
  }, [loading, data]);

  useSubscription<IUpdateVillagesSubscription>(UpdateVillages, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.loading || !subscriptionData.data) {
        return;
      }

      setVillages(subscriptionData.data.villages);
    },
  });

  const navigationItems = useMemo(() => villages.map(village => ({
    text: village.name,
    path: `${match.url}/${village.id}`,
  })), [villages, match.url]);

  useEffect(() => {
    setItems(navigationItems);

    return () => setItems([]);
  }, [setItems, navigationItems]);

  if (loading) {
    return null;
  }

  return (
    <Switch>
      <Route path={`${match.path}/:id`} render={(props: RouteComponentProps<IVillageRouteParams>) => <Village villageId={+props.match.params.id} />} />
      {navigationItems.length > 0 && (
        <Redirect to={navigationItems[0].path} />
      )}
    </Switch>
  );
};
