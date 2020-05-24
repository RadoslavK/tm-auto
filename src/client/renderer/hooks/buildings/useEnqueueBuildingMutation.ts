// TODO: remove in the future because types can be normally imported https://github.com/benmosher/eslint-plugin-import/issues/1618
// eslint-disable-next-line import/no-extraneous-dependencies
import { ExecutionResult } from '@apollo/react-common';
import { useMutation } from '@apollo/react-hooks';

import { EnqueueBuilding } from '*/graphql_operations/queuedBuilding.graphql';

import {
  IEnqueueBuildingMutation,
  IEnqueueBuildingMutationVariables,
} from '../../_types/graphql';
import { useVillageContext } from '../useVillageContext';

type Params = {
  readonly buildingType: number
  readonly fieldId: number;
  readonly targetLevel?: number;
};

type ReturnType = (targetLevel?: number) => Promise<ExecutionResult<IEnqueueBuildingMutation>>;

export const useEnqueueBuildingMutation = (params: Params): ReturnType => {
  const { villageId } = useVillageContext();

  const createOptions = (optionParams: Params) => ({
    variables: {
      input: {
        fieldId: optionParams.fieldId,
        targetLevel: optionParams.targetLevel || null,
        type: optionParams.buildingType,
        villageId,
      },
    },
  });

  const [mutate] = useMutation<IEnqueueBuildingMutation, IEnqueueBuildingMutationVariables>(
    EnqueueBuilding,
    createOptions(params),
  );

  return (targetLevel?: number): Promise<ExecutionResult<IEnqueueBuildingMutation>> => {
    const options = targetLevel
      ? createOptions({
        ...params,
        targetLevel,
      })
      : undefined;

    return mutate(options);
  };
};
