import * as React from 'react';
import { IVillage } from '../../../../_shared/contract/models/IVillage';
import { gql } from 'apollo-boost';
import { EnsuredQuery } from '../_shared/EnsuredQuery';

const villageQuery = gql`
  query GetVillageById($id: Int!) {
    village(id: $id) {
      id,
      name
    }
  }
`;

interface IQueryData {
  readonly village: Pick<IVillage, 'name'>;
}

interface IQueryVariables {
  readonly id: number;
}

interface IParams {
  readonly id: number;
}

export const Village: React.FunctionComponent<IParams> = (props) => {
  const {
    id,
  } = props;

  return (
    <EnsuredQuery<IQueryData, IQueryVariables>
      query={villageQuery}
      variables={{ id }}
    >
      {({ data }) => (
        <h1>{data.village && data.village.name}</h1>
      )}
    </EnsuredQuery>
  );
};
