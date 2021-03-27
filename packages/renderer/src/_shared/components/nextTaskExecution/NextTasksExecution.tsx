import { Dialog } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useMemo,
  useState,
} from 'react';
import {
  useLazyLoadQuery,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import type { Duration } from 'shared/types/duration.type.js';
import { formatTimeFromSeconds } from 'shared/utils/formatTime.js';

import type { NextTasksExecutionQuery } from '../../../_graphql/__generated__/NextTasksExecutionQuery.graphql.js';
import type { NextTasksExecutionResetMutation } from '../../../_graphql/__generated__/NextTasksExecutionResetMutation.graphql.js';
import type { NextTasksExecutionSetMutation } from '../../../_graphql/__generated__/NextTasksExecutionSetMutation.graphql.js';
import type { NextTasksExecutionSubscription } from '../../../_graphql/__generated__/NextTasksExecutionSubscription.graphql.js';
import { useCountDown } from '../../../hooks/useCountDown.js';
import { getSecondsUntilTimestamp } from '../../../utils/getSecondsUntilTimestamp.js';
import { NextExecutionForm } from './NextExecutionForm.js';

const nextTasksExecutionQuery = graphql`
  query NextTasksExecutionQuery {
      nextTasksExecution {
          totalSeconds
      }
  }
`;

const setNextTasksExecutionMutation = graphql`
  mutation NextTasksExecutionSetMutation($delay: DurationInput!) {
      setNextTasksExecution(delay: $delay) {
          ...Timestamp
      }
  }
`;

const resetNextTasksExecutionMutation = graphql`
    mutation NextTasksExecutionResetMutation {
        resetNextTasksExecution {
            ...Timestamp
        }
    }
`;

const nextTasksExecutionSubscription = graphql`
  subscription NextTasksExecutionSubscription {
      nextTasksExecutionChanged {
          ...Timestamp
      }
  }
`;

export const NextTasksExecution: React.FC = () => {
  const { nextTasksExecution } = useLazyLoadQuery<NextTasksExecutionQuery>(nextTasksExecutionQuery, {});
  const [setNextTasksExecution] = useMutation<NextTasksExecutionSetMutation>(setNextTasksExecutionMutation);
  const [resetNextTasksExecution] = useMutation<NextTasksExecutionResetMutation>(resetNextTasksExecutionMutation);

  const nextTasksExecutionSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<NextTasksExecutionSubscription> => ({
    subscription: nextTasksExecutionSubscription,
    variables: {},
    updater: (root) => {
      const newRecord = root.getRootField('nextTasksExecutionChanged');
      root.getRoot().setLinkedRecord(newRecord, 'nextTasksExecution');
    },
  }), []);

  useSubscription(nextTasksExecutionSubscriptionConfig);

  const timer = useCountDown(getSecondsUntilTimestamp(nextTasksExecution));

  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const submitForm = (duration: Duration): void => {
    setNextTasksExecution({
      variables: {
        delay: duration,
      },
      updater: (root) => {
        const newRecord = root.getRootField('setNextTasksExecution');
        root.getRoot().setLinkedRecord(newRecord, 'nextTasksExecution');
      },
    });

    closeForm();
  };

  const onReset = () => {
    resetNextTasksExecution({
      variables: {},
      updater: (root) => {
        const newRecord = root.getRootField('resetNextTasksExecution');
        root.getRoot().setLinkedRecord(newRecord, 'nextTasksExecution');
      },
    });
  };

  return (
    <div>
      <div>
        Next bot tasks check in: {formatTimeFromSeconds(timer)}
        <button onClick={showForm}>Change</button>
        <button onClick={onReset}>Reset</button>
      </div>
      <Dialog onClose={closeForm} open={isFormShown}>
        <NextExecutionForm onSubmit={submitForm} />
      </Dialog>
    </div>
  );
};
