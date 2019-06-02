import React from 'react';
import { gql } from 'apollo-boost';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IVillage } from '../../../../_shared/contract/models/IVillage';
import { Village } from './Village';
import { EnsuredQuery } from '../_shared/EnsuredQuery';
import { SideMenu } from '../_shared/SideMenu';

const villagesQuery = gql`
  {
    villages {
      id,
      name
    }
  }
`;

interface IQueryData {
  readonly villages: readonly Pick<IVillage, 'id' | 'name'>[];
}

export const Villages: React.FunctionComponent = () => {
  return (
    <EnsuredQuery<IQueryData> query={villagesQuery}>
      {({ data }) => {
        const navigationItems = data.villages.map(village => ({
          text: village.name,
          path: `/villages/${village.id}`,
        }));

        return (
          <>
            <SideMenu items={navigationItems} />

            <Switch>
              <Route path='/villages/:id' render={(props) => <Village id={+props.match.params.id} />} />
              {navigationItems.length > 0 && (
                <Redirect to={navigationItems[0].path} />
              )}
            </Switch>
          </>
        )
      }}
    </EnsuredQuery>
  );
};
