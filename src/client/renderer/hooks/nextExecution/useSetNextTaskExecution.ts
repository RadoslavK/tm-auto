import { useMutation } from '@apollo/client';

import { SetNextTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  SetNextTaskExecutionMutation,
  SetNextTaskExecutionMutationVariables,
} from '../../_graphql/types/graphql.type';

export const useSetNextTaskExecution = () => {
  const [setNextTaskExecution] = useMutation<SetNextTaskExecutionMutation, SetNextTaskExecutionMutationVariables>(
    SetNextTaskExecution,
  );

  return setNextTaskExecution;
};

