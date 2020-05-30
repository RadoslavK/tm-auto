import { useMutation } from '@apollo/client';

import { SetNextVillageTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  SetNextVillageTaskExecutionMutation,
  SetNextVillageTaskExecutionMutationVariables,
} from '../../_graphql/types/graphql.type';

export const useSetNextVillageTaskExecution = () => {
  const [setNextVillageTaskExecution] = useMutation<SetNextVillageTaskExecutionMutation, SetNextVillageTaskExecutionMutationVariables>(
    SetNextVillageTaskExecution,
  );

  return setNextVillageTaskExecution;
};