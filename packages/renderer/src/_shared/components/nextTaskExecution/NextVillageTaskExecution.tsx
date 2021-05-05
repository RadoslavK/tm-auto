import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useFragment,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import type { SelectorStoreUpdater } from 'relay-runtime';
import type { Duration } from 'shared/types/duration.type.js';

import type { NextVillageTaskExecution_timestamp$key } from '../../../_graphql/__generated__/NextVillageTaskExecution_timestamp.graphql.js';
import type {
  NextVillageTaskExecutionResetMutation,
  NextVillageTaskExecutionResetMutationResponse,
} from '../../../_graphql/__generated__/NextVillageTaskExecutionResetMutation.graphql.js';
import type {
  NextVillageTaskExecutionSetMutation,
  NextVillageTaskExecutionSetMutationResponse,
  VillageTaskType,
} from '../../../_graphql/__generated__/NextVillageTaskExecutionSetMutation.graphql.js';
import type {
  NextVillageTaskExecutionSubscription,
  NextVillageTaskExecutionSubscriptionResponse,
} from '../../../_graphql/__generated__/NextVillageTaskExecutionSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { useCountDown } from '../../../hooks/useCountDown.js';
import { getSecondsUntilTimestamp } from '../../../utils/getSecondsUntilTimestamp.js';
import { NextExecution } from './NextExecution.js';

type Props = {
  readonly className?: string;
  readonly task: VillageTaskType;
  readonly timestamp: NextVillageTaskExecution_timestamp$key;
  readonly resetUpdater?: SelectorStoreUpdater<NextVillageTaskExecutionResetMutationResponse>;
  readonly setUpdater?: SelectorStoreUpdater<NextVillageTaskExecutionSetMutationResponse>;
  readonly subscriptionUpdater?: SelectorStoreUpdater<NextVillageTaskExecutionSubscriptionResponse>;
};

const fragmentDef = graphql`
  fragment NextVillageTaskExecution_timestamp on Timestamp {
    ...Timestamp @relay(mask: false)
  }
`;

const setMutation = graphql`
  mutation NextVillageTaskExecutionSetMutation($villageId: ID!, $task: VillageTaskType!, $delay: DurationInput!) {
      setNextVillageTaskExecution(villageId: $villageId, task: $task, delay: $delay) {
          ...NextVillageTaskExecution_timestamp
      }
  }
`;

const resetMutation = graphql`
    mutation NextVillageTaskExecutionResetMutation($villageId: ID!, $task: VillageTaskType!) {
        resetNextVillageTaskExecution(villageId: $villageId, task: $task) {
            ...NextVillageTaskExecution_timestamp
        }
    }
`;

const subscription = graphql`
  subscription NextVillageTaskExecutionSubscription($villageId: ID!, $task: VillageTaskType!) {
      nextVillageTaskExecutionChanged(task: $task, villageId: $villageId) {
          ...NextVillageTaskExecution_timestamp
      }
  }
`;

export const NextVillageTaskExecution: React.FC<Props> = ({
  className,
  task,
  timestamp,
  resetUpdater,
  setUpdater,
  subscriptionUpdater,
}) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const nextVillageTaskExecution = useFragment(fragmentDef, timestamp);
  const [setNextExecution] = useMutation<NextVillageTaskExecutionSetMutation>(setMutation);
  const [resetNextExecution] = useMutation<NextVillageTaskExecutionResetMutation>(resetMutation);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<NextVillageTaskExecutionSubscription> => ({
    subscription,
    variables: { task, villageId },
    updater: subscriptionUpdater || ((store) => {
      const newRecord = store.getRootField('nextVillageTaskExecutionChanged');
      store.getRoot().setLinkedRecord(newRecord, 'nextVillageTaskExecution', { task, villageId });
    }),
  }), [task, villageId, subscriptionUpdater]);

  useSubscription(subscriptionConfig);

  const timer = useCountDown(getSecondsUntilTimestamp(nextVillageTaskExecution));

  const submit = (duration: Duration): void => {
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
      updater: setUpdater || ((store) => {
        const newRecord = store.getRootField('setNextVillageTaskExecution');
        store.getRoot().setLinkedRecord(newRecord, 'nextVillageTaskExecution', { task, villageId });
      }),
    });
  };

  const reset = () => {
    resetNextExecution({
      variables: {
        task,
        villageId,
      },
      updater: resetUpdater || ((store) => {
        const newRecord = store.getRootField('resetNextVillageTaskExecution');
        store.getRoot().setLinkedRecord(newRecord, 'nextVillageTaskExecution', { task, villageId });
      }),
    });
  };

  return (
    <div className={className}>
      <NextExecution
        onReset={reset}
        onChange={submit}
        timer={timer}
      />
    </div>
  );
};

NextVillageTaskExecution.displayName = 'NextVillageTaskExecution';