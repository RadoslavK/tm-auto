import { GetVillages } from '*/graphql_operations/village.graphql';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import useRouter from 'use-react-router';
import { IGetVillagesQuery } from '../../_types/graphql';
import { ISideMenuContext, SideMenuContext } from '../sideMenu/context/SideMenuContext';
import { Village } from './Village';

interface IVillageRouteParams {
  readonly id: string;
}

export const Villages: React.FunctionComponent = () => {
  const { match } = useRouter();
  const { setItems } = useContext<ISideMenuContext>(SideMenuContext);
  const { data, loading } = useQuery<IGetVillagesQuery>(GetVillages,
    {
      fetchPolicy: 'network-only',
    });

  const navigationItems = loading
    ? []
    : data.villages.map(village => ({
      text: village.name,
      path: `${match.url}/${village.id}`,
    }));

  useEffect(() => {
    setItems(navigationItems);

    return () => setItems([]);
  }, [ data ]);

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
