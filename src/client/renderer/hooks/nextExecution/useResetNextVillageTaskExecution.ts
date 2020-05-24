import { useMutation } from '@apollo/react-hooks';

import { ResetNextVillageTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  IResetNextVillageTaskExecutionMutation,
  IResetNextVillageTaskExecutionMutationVariables,
} from '../../_types/graphql';

export const useResetNextVillageTaskExecution = () => {
  const [resetNextVillageTaskExecution] = useMutation<IResetNextVillageTaskExecutionMutation, IResetNextVillageTaskExecutionMutationVariables>(
    ResetNextVillageTaskExecution,
  );

  return resetNextVillageTaskExecution;
};