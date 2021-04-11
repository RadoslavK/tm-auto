import { Dialog } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useMemo,
  useState,
} from 'react';
import {
  useFragment,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import type { Duration } from 'shared/types/duration.type.js';
import { formatTimeFromSeconds } from 'shared/utils/formatTime.js';

import type { NextVillageTaskExecution_timestamp$key } from '../../../_graphql/__generated__/NextVillageTaskExecution_timestamp.graphql.js';
import type { NextVillageTaskExecutionResetMutation } from '../../../_graphql/__generated__/NextVillageTaskExecutionResetMutation.graphql.js';
import type {
  NextVillageTaskExecutionSetMutation,
  TaskType,
} from '../../../_graphql/__generated__/NextVillageTaskExecutionSetMutation.graphql.js';
import type { NextVillageTaskExecutionSubscription } from '../../../_graphql/__generated__/NextVillageTaskExecutionSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { useCountDown } from '../../../hooks/useCountDown.js';
import { getSecondsUntilTimestamp } from '../../../utils/getSecondsUntilTimestamp.js';
import { NextExecutionForm } from './NextExecutionForm.js';

type Props = {
  readonly task: TaskType;
  readonly timestamp: NextVillageTaskExecution_timestamp$key;
};

const fragmentDef = graphql`
  fragment NextVillageTaskExecution_timestamp on Timestamp {
    ...Timestamp @relay(mask: false)
  }
`;

const setMutation = graphql`
  mutation NextVillageTaskExecutionSetMutation($villageId: ID!, $task: TaskType!, $delay: DurationInput!) {
      setNextVillageTaskExecution(villageId: $villageId, task: $task, delay: $delay) {
          ...NextVillageTaskExecution_timestamp
      }
  }
`;

const resetMutation = graphql`
    mutation NextVillageTaskExecutionResetMutation($villageId: ID!, $task: TaskType!) {
        resetNextVillageTaskExecution(villageId: $villageId, task: $task) {
            ...NextVillageTaskExecution_timestamp
        }
    }
`;

const subscription = graphql`
  subscription NextVillageTaskExecutionSubscription($villageId: ID!, $task: TaskType!) {
      nextVillageTaskExecutionChanged(task: $task, villageId: $villageId) {
          ...NextVillageTaskExecution_timestamp
      }
  }
`;

export const NextVillageTaskExecution: React.FC<Props> = ({ task, timestamp }) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const nextVillageTaskExecution = useFragment(fragmentDef, timestamp);
  const [setNextExecution] = useMutation<NextVillageTaskExecutionSetMutation>(setMutation);
  const [resetNextExecution] = useMutation<NextVillageTaskExecutionResetMutation>(resetMutation);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<NextVillageTaskExecutionSubscription> => ({
    subscription,
    variables: { task, villageId },
    updater: (store) => {
      const newRecord = store.getRootField('nextVillageTaskExecutionChanged');
      store.getRoot().setLinkedRecord(newRecord, 'nextVillageTaskExecution', { task, villageId });
    },
  }), [task, villageId]);

  useSubscription(subscriptionConfig);

  const nextExecutionTimer = useCountDown(getSecondsUntilTimestamp(nextVillageTaskExecution));

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
      updater: (store) => {
        const newRecord = store.getRootField('setNextVillageTaskExecution');
        store.getRoot().setLinkedRecord(newRecord, 'nextVillageTaskExecution', { task, villageId });
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
      updater: (store) => {
        const newRecord = store.getRootField('resetNextVillageTaskExecution');
        store.getRoot().setLinkedRecord(newRecord, 'nextVillageTaskExecution', { task, villageId });
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

NextVillageTaskExecution.displayName = 'NextVillageTaskExecution';