import { GetVillageById } from '*/graphql_operations/village.graphql';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { IGetVillageByIdQuery, IGetVillageByIdQueryVariables } from '../../_types/graphql';
import { Building } from '../buildings/Building';

interface IParams {
  readonly id: string;
}

export const Village: React.FunctionComponent<IParams> = (props) => {
  const {
    id,
  } = props;

  const { data, loading } = useQuery<IGetVillageByIdQuery, IGetVillageByIdQueryVariables>(GetVillageById,
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
