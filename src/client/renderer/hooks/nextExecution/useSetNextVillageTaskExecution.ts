import { useMutation } from '@apollo/react-hooks';

import { SetNextVillageTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  SetNextVillageTaskExecutionMutation,
  SetNextVillageTaskExecutionMutationVariables,
} from '../../_types/graphql';

export const useSetNextVillageTaskExecution = () => {
  const [setNextVillageTaskExecution] = useMutation<SetNextVillageTaskExecutionMutation, SetNextVillageTaskExecutionMutationVariables>(
    SetNextVillageTaskExecution,
  );

  return setNextVillageTaskExecution;
};