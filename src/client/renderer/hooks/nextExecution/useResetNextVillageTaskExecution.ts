import { useMutation } from '@apollo/client';

import { ResetNextVillageTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  ResetNextVillageTaskExecutionMutation,
  ResetNextVillageTaskExecutionMutationVariables,
} from '../../_graphql/types/graphql.type';

export const useResetNextVillageTaskExecution = () => {
  const [resetNextVillageTaskExecution] = useMutation<ResetNextVillageTaskExecutionMutation, ResetNextVillageTaskExecutionMutationVariables>(
    ResetNextVillageTaskExecution,
  );

  return resetNextVillageTaskExecution;
};