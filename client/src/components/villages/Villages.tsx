import React from 'react';
import { gql } from 'apollo-boost';
import { Link, Route } from 'react-router-dom';
import { IVillage } from '../../../../_shared/contract/models/IVillage';
import { Village } from './Village';
import { EnsuredQuery } from '../_shared/EnsuredQuery';

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
    <>
      <EnsuredQuery<IQueryData> query={villagesQuery}>
        {({ data }) => (
          <ul>
            {data && data.villages && data.villages.map(village => (
              <li key={village.id}>
                <Link to={`/villages/${village.id.toString()}`}>{village.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </EnsuredQuery>

      <Route path='/villages/:id' render={(props) => <Village id={+props.match.params.id} />} />
    </>
  );
};
