import { GetVillages } from '*/graphql_operations/village.graphql';
import React, { useContext, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IGetVillagesQuery } from '../../_types/graphql';
import { ISideMenuContext, SideMenuContext } from '../sideMenu/context/SideMenuContext';
import { Village } from './Village';

export const Villages: React.FunctionComponent = () => {
  const { setItems } = useContext<ISideMenuContext>(SideMenuContext);
  const { data, loading } = useQuery<IGetVillagesQuery>(GetVillages,
    {
      fetchPolicy: 'network-only',
    });

  const navigationItems = loading
    ? []
    : data.villages.map(village => ({
      text: village.name,
      path: `/villages/${village.id}`,
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
      <Route path='/villages/:id' render={(props) => <Village villageId={props.match.params.id} />} />
      {navigationItems.length > 0 && (
        <Redirect to={navigationItems[0].path} />
      )}
    </Switch>
  );
};
