import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
import { Redirect, Route, Switch } from 'react-router-dom';
import { GetVillages } from './_types/GetVillages';
import { Village } from './Village';
import { SideMenu } from '../_shared/SideMenu';

const getVillagesQuery = gql`
  query GetVillages {
    villages {
      id,
      name
    }
  }
`;

export const Villages: React.FunctionComponent = () => {
  const { data, loading } = useQuery<GetVillages>(getVillagesQuery,
    {
      fetchPolicy: 'network-only',
    });

  if (loading) {
    return null;
  }

  const navigationItems = data.villages.map(village => ({
    text: village.name,
    path: `/villages/${village.id}`,
  }));

  return (
    <>
      <SideMenu items={navigationItems} />

      <Switch>
        <Route path='/villages/:id' render={(props) => <Village id={props.match.params.id} />} />
        {navigationItems.length > 0 && (
          <Redirect to={navigationItems[0].path} />
        )}
      </Switch>
    </>
  );
};
