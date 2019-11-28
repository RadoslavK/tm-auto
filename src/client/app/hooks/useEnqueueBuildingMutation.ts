import {
  MutationTuple,
  useMutation,
} from '@apollo/react-hooks';

import { EnqueueBuilding } from '*/graphql_operations/queuedBuilding.graphql';

import {
  IEnqueueBuildingMutation,
  IEnqueueBuildingMutationVariables,
} from '../../_types/graphql';
import { useVillageContext } from './useVillageContext';

interface IParams {
  readonly buildingType: number
  readonly fieldId: number;
  readonly levels?: number;
}

export const useEnqueueBuildingMutation = (params: IParams): MutationTuple<IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables> => {
  const { villageId } = useVillageContext();

  const {
    buildingType,
    fieldId,
    levels = 1,
  } = params;

  return useMutation<IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables>(EnqueueBuilding, {
    variables: {
      input: {
        type: buildingType,
        fieldId,
        levels,
        villageId,
      },
    },
  });
};
