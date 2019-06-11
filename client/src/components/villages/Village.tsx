import { GetVillageById } from '*/graphql_operations/village.graphql';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import {
  IGetVillageByIdQuery,
  IGetVillageByIdQueryVariables,
} from '../../_types/graphql';
import { Buildings } from '../buildings/Buildings';
import { IVillageContext, VillageContext } from './context/VillageContext';
import { Resources } from './Resources';

interface IParams {
  readonly villageId: number;
}

export const Village: React.FunctionComponent<IParams> = (props) => {
  const {
    villageId,
  } = props;

  const { data, loading } = useQuery<IGetVillageByIdQuery, IGetVillageByIdQueryVariables>(GetVillageById, {
    variables: { villageId },
    fetchPolicy: 'network-only',
  });

  if (loading || !data.village) {
    return null;
  }

  const {
    resources,
  } = data.village;

  const context: IVillageContext = {
    villageId,
  };

  return (
    <VillageContext.Provider value={context}>
      <Resources resources={resources} />
      <Buildings />
    </VillageContext.Provider>
  );
};
