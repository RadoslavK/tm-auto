import Dialog from '@material-ui/core/Dialog';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';
import { Duration } from '../../../../_shared/types/duration.type';
import { formatTimeFromSeconds } from '../../../../_shared/utils/formatTime';
import { NextVillageTaskExecutionResetMutation } from '../../../_graphql/__generated__/NextVillageTaskExecutionResetMutation.graphql';
import { NextVillageTaskExecutionSetMutation } from '../../../_graphql/__generated__/NextVillageTaskExecutionSetMutation.graphql';

import { useCountDown } from '../../../hooks/useCountDown';
import { NextVillageTaskExecutionQuery, TaskType } from '../../../_graphql/__generated__/NextVillageTaskExecutionQuery.graphql';
import { NextExecutionForm } from './NextExecutionForm';

type Props = {
  readonly task: TaskType;
};

const query = graphql`
  query NextVillageTaskExecutionQuery($task: TaskType!, $villageId: ID!) {
      nextVillageTaskExecution(task: $task, villageId: $villageId) {
          totalSeconds
      }
  }
`;

const setMutation = graphql`
  mutation NextVillageTaskExecutionSetMutation($villageId: ID!, $task: TaskType!, $delay: DurationInput!) {
      setNextVillageTaskExecution(villageId: $villageId, task: $task, delay: $delay) {
          totalSeconds
      }
  }
`;

const resetMutation = graphql`
    mutation NextVillageTaskExecutionResetMutation($villageId: ID!, $task: TaskType!) {
        resetNextVillageTaskExecution(villageId: $villageId, task: $task) {
            totalSeconds
        }
    }
`;

export const NextVillageTaskExecution: React.FC<Props> = ({ task }) => {
  const villageId = '';

  const { nextVillageTaskExecution } = useLazyLoadQuery<NextVillageTaskExecutionQuery>(query, {
    task,
    villageId,
  });
  const [setNextExecution] = useMutation<NextVillageTaskExecutionSetMutation>(setMutation);
  const [resetNextExecution] = useMutation<NextVillageTaskExecutionResetMutation>(resetMutation);

  const nextExecutionTimer = useCountDown(nextVillageTaskExecution.totalSeconds);

  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const onSubmit = (duration: Duration): void => {
    setNextExecution({
      variables: {
        delay: {
          days: duration.days,
          hours: duration.hours,
          minutes: duration.minutes,
          seconds: duration.seconds,
        },
        task,
        villageId,
      },
    });

    closeForm();
  };

  const onReset = () => {
    resetNextExecution({
      variables: {
        task,
        villageId,
      },
    });
  };

  return (
    <div>
      <div>
        Next execution in: {formatTimeFromSeconds(nextExecutionTimer)}
        <button onClick={showForm}>Change</button>
        <button onClick={onReset}>Reset</button>
      </div>
      <Dialog onClose={closeForm} open={isFormShown}>
        <NextExecutionForm onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};
