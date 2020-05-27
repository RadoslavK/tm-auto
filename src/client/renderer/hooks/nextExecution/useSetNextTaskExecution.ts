import { useMutation } from '@apollo/react-hooks';

import { SetNextTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  SetNextTaskExecutionMutation,
  SetNextTaskExecutionMutationVariables,
} from '../../_types/graphql';

export const useSetNextTaskExecution = () => {
  const [setNextTaskExecution] = useMutation<SetNextTaskExecutionMutation, SetNextTaskExecutionMutationVariables>(
    SetNextTaskExecution,
  );

  return setNextTaskExecution;
};

