import { FetchResult } from '@apollo/client/link/core/types';

import {
  EnqueueBuildingMutation,
  useEnqueueBuildingMutation as _useEnqueueBuildingMutation,
} from '../../_graphql/graphqlHooks';
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

  const [mutate] = _useEnqueueBuildingMutation(createOptions(params));

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
