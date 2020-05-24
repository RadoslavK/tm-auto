import { useMutation } from '@apollo/react-hooks';

import { SetNextVillageTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  ISetNextVillageTaskExecutionMutation,
  ISetNextVillageTaskExecutionMutationVariables,
} from '../../_types/graphql';

export const useSetNextVillageTaskExecution = () => {
  const [setNextVillageTaskExecution] = useMutation<ISetNextVillageTaskExecutionMutation, ISetNextVillageTaskExecutionMutationVariables>(
    SetNextVillageTaskExecution,
  );

  return setNextVillageTaskExecution;
};