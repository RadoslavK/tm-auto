import { useMutation } from '@apollo/react-hooks';

import { ResetNextTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  ResetNextTaskExecutionMutation,
  ResetNextTaskExecutionMutationVariables,
} from '../../_types/graphql';

export const useResetNextTaskExecution = () => {
  const [resetNextTaskExecution] = useMutation<ResetNextTaskExecutionMutation, ResetNextTaskExecutionMutationVariables>(
    ResetNextTaskExecution,
  );

  return resetNextTaskExecution;
};