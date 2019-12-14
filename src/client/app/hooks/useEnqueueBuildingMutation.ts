import {
  ExecutionResult,
  MutationResult,
} from '@apollo/react-common';
import { useMutation } from '@apollo/react-hooks';

import { EnqueueBuilding } from '*/graphql_operations/queuedBuilding.graphql';

import {
  IEnqueueBuildingMutation,
  IEnqueueBuildingMutationVariables,
} from '../../_types/graphql';
import { useVillageContext } from './useVillageContext';

interface IParams {
  readonly buildingType: number
  readonly fieldId: number;
  readonly targetLevel?: number;
}

type ReturnType = [
  (targetLevel?: number) => Promise<ExecutionResult<IEnqueueBuildingMutation>>,
  MutationResult<IEnqueueBuildingMutation>,
];

export const useEnqueueBuildingMutation = (params: IParams): ReturnType => {
  const { villageId } = useVillageContext();

  const createOptions = (optionParams: IParams) => ({
    variables: {
      input: {
        type: optionParams.buildingType,
        fieldId: optionParams.fieldId,
        targetLevel: optionParams.targetLevel || null,
        villageId,
      },
    },
  });

  const [mutate, mutationResult] = useMutation<IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables>(EnqueueBuilding, createOptions(params));

  const enqueue = async (targetLevel?: number): Promise<ExecutionResult<IEnqueueBuildingMutation>> => {
    const options = targetLevel
      ? createOptions({
        ...params,
        targetLevel,
      })
      : undefined;

    return mutate(options);
  };

  return [enqueue, mutationResult];
};
