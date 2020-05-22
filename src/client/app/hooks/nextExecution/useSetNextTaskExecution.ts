import { useMutation } from '@apollo/react-hooks';

import { SetNextTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  ISetNextTaskExecutionMutation,
  ISetNextTaskExecutionMutationVariables,
} from '../../../_types/graphql';

export const useSetNextTaskExecution = () => {
  const [setNextTaskExecution] = useMutation<ISetNextTaskExecutionMutation, ISetNextTaskExecutionMutationVariables>(
    SetNextTaskExecution,
  );

  return setNextTaskExecution;
};

