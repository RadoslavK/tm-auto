import { useMutation } from '@apollo/react-hooks';

import { ResetNextVillageTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  ResetNextVillageTaskExecutionMutation,
  ResetNextVillageTaskExecutionMutationVariables,
} from '../../_types/graphql';

export const useResetNextVillageTaskExecution = () => {
  const [resetNextVillageTaskExecution] = useMutation<ResetNextVillageTaskExecutionMutation, ResetNextVillageTaskExecutionMutationVariables>(
    ResetNextVillageTaskExecution,
  );

  return resetNextVillageTaskExecution;
};