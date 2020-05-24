import { useQuery } from '@apollo/react-hooks';

import { GetVillageById } from '*/graphql_operations/village.graphql';

import {
  IGetVillageByIdQuery,
  IGetVillageByIdQueryVariables,
} from '../../../_types/graphql';
import { useOnVillageUpdate } from './useOnVillageUpdate';

export const useGetVillageById = (villageId: number) => {
  const { data, loading, refetch } = useQuery<IGetVillageByIdQuery, IGetVillageByIdQueryVariables>(GetVillageById, {
    variables: { villageId },
  });

  useOnVillageUpdate(refetch);

  if (loading || !data) {
    return null;
  }

  return {
    refetch,
    village: data.village,
  };
};