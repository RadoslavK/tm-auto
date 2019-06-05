import React, { useContext, useEffect } from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ISideMenuContext, SideMenuContext } from '../_shared/SideMenu/context/SideMenuContext';
import { GetVillages } from './_types/GetVillages';
import { Village } from './Village';

const getVillagesQuery = gql`
  query GetVillages {
    villages {
      id,
      name
    }
  }
`;

export const Villages: React.FunctionComponent = () => {
  const { setItems } = useContext<ISideMenuContext>(SideMenuContext);
  const { data, loading } = useQuery<GetVillages>(getVillagesQuery,
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
  });

  if (loading) {
    return null;
  }

  return (
    <Switch>
      <Route path='/villages/:id' render={(props) => <Village id={props.match.params.id} />} />
      {navigationItems.length > 0 && (
        <Redirect to={navigationItems[0].path} />
      )}
    </Switch>
  );
};
