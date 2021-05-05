import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useFragment,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import type { Duration } from 'shared/types/duration.type.js';

import type { NextTasksExecution_timestamp$key } from '../../../_graphql/__generated__/NextTasksExecution_timestamp.graphql.js';
import type { NextTasksExecutionResetMutation } from '../../../_graphql/__generated__/NextTasksExecutionResetMutation.graphql.js';
import type { NextTasksExecutionSetMutation } from '../../../_graphql/__generated__/NextTasksExecutionSetMutation.graphql.js';
import type { NextTasksExecutionSubscription } from '../../../_graphql/__generated__/NextTasksExecutionSubscription.graphql.js';
import { useCountDown } from '../../../hooks/useCountDown.js';
import { getSecondsUntilTimestamp } from '../../../utils/getSecondsUntilTimestamp.js';
import { NextExecution } from './NextExecution.js';

const fragmentDef = graphql`
    fragment NextTasksExecution_timestamp on Timestamp {
        ...Timestamp @relay(mask: false)
    }
`;

const setNextTasksExecutionMutation = graphql`
  mutation NextTasksExecutionSetMutation($delay: DurationInput!) {
      setNextTasksExecution(delay: $delay) {
          ...NextTasksExecution_timestamp
      }
  }
`;

const resetNextTasksExecutionMutation = graphql`
    mutation NextTasksExecutionResetMutation {
        resetNextTasksExecution {
            ...NextTasksExecution_timestamp
        }
    }
`;

const nextTasksExecutionSubscription = graphql`
  subscription NextTasksExecutionSubscription {
      nextTasksExecutionChanged {
          ...NextTasksExecution_timestamp
      }
  }
`;

type Props = {
  readonly timestamp: NextTasksExecution_timestamp$key;
};

export const NextTasksExecution: React.FC<Props> = ({ timestamp }) => {
  const nextTasksExecution = useFragment(fragmentDef, timestamp);
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

  const submit = (duration: Duration): void => {
    setNextTasksExecution({
      variables: {
        delay: duration,
      },
      updater: (root) => {
        const newRecord = root.getRootField('setNextTasksExecution');
        root.getRoot().setLinkedRecord(newRecord, 'nextTasksExecution');
      },
    });
  };

  const reset = () => {
    resetNextTasksExecution({
      variables: {},
      updater: (root) => {
        const newRecord = root.getRootField('resetNextTasksExecution');
        root.getRoot().setLinkedRecord(newRecord, 'nextTasksExecution');
      },
    });
  };

  return (
    <NextExecution
      getAlternativeTitle={timer => `Next bot tasks check in ${timer}`}
      onReset={reset}
      onChange={submit}
      timer={timer}
    />
  );
};

NextTasksExecution.displayName = 'NextTasksExecution';