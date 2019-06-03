import React from 'react';
import { gql } from 'apollo-boost';
import { EnsuredQuery } from '../_shared/EnsuredQuery';
import { Building } from '../buildings/Building';
import { GetVillageById, GetVillageByIdVariables } from './_types/GetVillageById';

const getVillageByIdQuery = gql`
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

interface IParams {
  readonly id: string;
}

export const Village: React.FunctionComponent<IParams> = (props) => {
  const {
    id,
  } = props;

  return (
    <EnsuredQuery<GetVillageById, GetVillageByIdVariables>
      query={getVillageByIdQuery}
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
