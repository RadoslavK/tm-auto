import { VillageExists } from '*/graphql_operations/village.graphql';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import {
  IVillageExistsQuery,
  IVillageExistsQueryVariables,
} from '../../_types/graphql';
import { Buildings } from '../buildings/Buildings';
import { IVillageContext, VillageContext } from './context/VillageContext';

interface IParams {
  readonly villageId: string;
}

export const Village: React.FunctionComponent<IParams> = (props) => {
  const {
    villageId,
  } = props;

  const { data, loading } = useQuery<IVillageExistsQuery, IVillageExistsQueryVariables>(VillageExists, {
    variables: {
      villageId,
    },
    fetchPolicy: 'network-only',
  });

  if (loading || !data.villageExists) {
    return null;
  }

  const context: IVillageContext = {
    villageId,
  };

  return (
    <VillageContext.Provider value={context}>
      <Buildings />
    </VillageContext.Provider>
  );
};
