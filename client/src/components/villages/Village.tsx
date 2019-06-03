import React from 'react';
import { IVillage } from '../../../../server/src/controller/models/village';
import { gql } from 'apollo-boost';
import { EnsuredQuery } from '../_shared/EnsuredQuery';
import { Building } from '../buildings/Building';

const villageQuery = gql`
  query GetVillageById($id: ID!) {
    village(id: $id) {
      name,
      buildings {
        type,
        level {
          actual,
          ongoing
        }
      }
    }
  }
`;

interface IQueryData {
  readonly village: Pick<IVillage, 'name' | 'buildings'>;
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
      {({ data }) => {
        const {
          village,
        } = data;

        return (
          <div>
            {village.buildings.map((building, index) => (
              <Building key={index} building={building} />
            ))}
          </div>
        )
      }}
    </EnsuredQuery>
  );
};
