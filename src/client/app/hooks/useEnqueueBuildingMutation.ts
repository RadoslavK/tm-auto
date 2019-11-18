import { useContext } from 'react';
import {
  MutationTuple,
  useMutation,
} from '@apollo/react-hooks';
import { EnqueueBuilding } from '*/graphql_operations/queuedBuilding.graphql';
import { IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables } from '../../_types/graphql';
import { IVillageContext, VillageContext } from '../components/villages/context/VillageContext';

interface IParams {
  readonly buildingType: number
  readonly fieldId: number;
  readonly levels?: number;
}

export const useEnqueueBuildingMutation = (params: IParams): MutationTuple<IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables> => {
  const { villageId } = useContext<IVillageContext>(VillageContext);

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
