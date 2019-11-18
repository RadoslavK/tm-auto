import React, {
  useContext,
  useEffect,
  useMemo,
} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect, Route, RouteComponentProps, Switch, useRouteMatch } from 'react-router-dom';
import { GetVillages } from '*/graphql_operations/village.graphql';
import { IGetVillagesQuery } from '../../../_types/graphql';
import { ISideMenuContext, SideMenuContext } from '../sideMenu/context/SideMenuContext';
import { Village } from './Village';

interface IVillageRouteParams {
  readonly id: string;
}

export const Villages: React.FunctionComponent = () => {
  const match = useRouteMatch();
  const { setItems } = useContext<ISideMenuContext>(SideMenuContext);
  const { data, loading } = useQuery<IGetVillagesQuery>(GetVillages,
    {
      fetchPolicy: 'network-only',
    });

  const navigationItems = useMemo(() => loading || !data
    ? []
    : data.villages.map(village => ({
      text: village.name,
      path: `${match.url}/${village.id}`,
    })), [loading, data, match.url]);

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
