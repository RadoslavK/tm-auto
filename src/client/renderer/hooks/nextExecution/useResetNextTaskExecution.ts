import { useMutation } from '@apollo/react-hooks';

import { ResetNextTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  IResetNextTaskExecutionMutation,
  IResetNextTaskExecutionMutationVariables,
} from '../../_types/graphql';

export const useResetNextTaskExecution = () => {
  const [resetNextTaskExecution] = useMutation<IResetNextTaskExecutionMutation, IResetNextTaskExecutionMutationVariables>(
    ResetNextTaskExecution,
  );

  return resetNextTaskExecution;
};