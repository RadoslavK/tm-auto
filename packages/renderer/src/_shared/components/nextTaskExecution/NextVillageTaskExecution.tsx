import { Dialog } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';
import type { Duration } from 'shared/types/duration.type.js';
import { formatTimeFromSeconds } from 'shared/utils/formatTime.js';

import type {
  NextVillageTaskExecutionQuery,
  TaskType, 
} from '../../../_graphql/__generated__/NextVillageTaskExecutionQuery.graphql.js';
import type { NextVillageTaskExecutionResetMutation } from '../../../_graphql/__generated__/NextVillageTaskExecutionResetMutation.graphql.js';
import type { NextVillageTaskExecutionSetMutation } from '../../../_graphql/__generated__/NextVillageTaskExecutionSetMutation.graphql.js';
import { useCountDown } from '../../../hooks/useCountDown.js';
import { NextExecutionForm } from './NextExecutionForm.js';

type Props = {
  readonly task: TaskType;
  readonly villageId: string;
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

export const NextVillageTaskExecution: React.FC<Props> = ({ task, villageId }) => {
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
