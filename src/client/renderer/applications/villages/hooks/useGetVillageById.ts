import { useQuery } from '@apollo/react-hooks';

import { GetVillageById } from '*/graphql_operations/village.graphql';

import {
  GetVillageByIdQuery,
  GetVillageByIdQueryVariables,
} from '../../../_types/graphql';
import { useOnVillageUpdate } from './useOnVillageUpdate';

export const useGetVillageById = (villageId: number) => {
  const { data, loading, refetch } = useQuery<GetVillageByIdQuery, GetVillageByIdQueryVariables>(GetVillageById, {
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