import { useMutation } from '@apollo/client';
import { FetchResult } from '@apollo/client/link/core/types';

import { EnqueueBuilding } from '*/graphql_operations/queuedBuilding.graphql';

import {
  EnqueueBuildingMutation,
  EnqueueBuildingMutationVariables,
} from '../../_graphql/types/graphql.type';
import { useVillageContext } from '../../applications/villages/context/villageContext';

type Params = {
  readonly buildingType: number
  readonly fieldId: number;
  readonly targetLevel?: number;
};

type ReturnType = (targetLevel?: number) => Promise<FetchResult<EnqueueBuildingMutation>>;

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

  const [mutate] = useMutation<EnqueueBuildingMutation, EnqueueBuildingMutationVariables>(
    EnqueueBuilding,
    createOptions(params),
  );

  return (targetLevel?: number): Promise<FetchResult<EnqueueBuildingMutation>> => {
    const options = targetLevel
      ? createOptions({
        ...params,
        targetLevel,
      })
      : undefined;

    return mutate(options);
  };
};
