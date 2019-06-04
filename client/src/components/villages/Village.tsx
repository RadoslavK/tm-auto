import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from 'react-apollo-hooks';
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

  const { data, loading } = useQuery<GetVillageById, GetVillageByIdVariables>(getVillageByIdQuery,
    { variables: { id },
      fetchPolicy: 'network-only',
    },
  );

  if (loading || !data.village) {
    return null;
  }

  return (
    <div>
      {data.village.buildings.map((building, index) => (
        <Building key={index} building={building} />
      ))}
    </div>
  );
};
