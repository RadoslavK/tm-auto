import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type {
  RecordProxy,
  RecordSourceSelectorProxy,
} from 'relay-runtime';
import type { SelectorStoreUpdater } from 'relay-runtime';

import type { GeneralVillageOverviewQuery } from '../../../_graphql/__generated__/GeneralVillageOverviewQuery.graphql.js';
import type { NextVillageTaskExecution_timestamp$key } from '../../../_graphql/__generated__/NextVillageTaskExecution_timestamp.graphql.js';
import type { TaskType } from '../../../_graphql/__generated__/NextVillageTaskExecutionSetMutation.graphql.js';
import type { NextVillageTaskExecutionSubscriptionResponse } from '../../../_graphql/__generated__/NextVillageTaskExecutionSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

const query = graphql`
    query GeneralVillageOverviewQuery($villageId: ID!) {
        nextVillageTaskExecutions(villageId: $villageId) {
            label
            task
            timestamp {
                ...NextVillageTaskExecution_timestamp
            }
        }
    }
`;

export const useGeneralVillageOverviewQuery = () => {
  const [generalVillageOverviewQueryRef, loadGeneralVillageOverviewQuery] = useQueryLoader<GeneralVillageOverviewQuery>(query);

  const reloadGeneralVillageOverviewQuery = useCallback((villageId: string) => {
    loadGeneralVillageOverviewQuery({ villageId }, { fetchPolicy: 'store-and-network' } );
  }, [loadGeneralVillageOverviewQuery]);

  return {
    generalVillageOverviewQueryRef,
    reloadGeneralVillageOverviewQuery,
  };
};

type NextVillageTaskExecutionWrapperProps = {
  readonly label: string;
  readonly task: TaskType;
  readonly timestamp: NextVillageTaskExecution_timestamp$key;
};

const NextVillageTaskExecutionWrapper: React.FC<NextVillageTaskExecutionWrapperProps> = ({
  timestamp,
  label,
  task,
}) => {
  const villageId = useRecoilValue(selectedVillageIdState);

  const updater = useMemo(() => <T extends {}>(getNewRecord: (store: RecordSourceSelectorProxy<T>) => RecordProxy) => (store: RecordSourceSelectorProxy<T>) => {
    const newTimestamp = getNewRecord(store);
    const root = store.getRoot();
    let executions = root.getLinkedRecords('nextVillageTaskExecutions', { villageId }) || [];

    executions
      .find(e => e.getValue('task') === task)
      ?.setLinkedRecord(newTimestamp, 'timestamp');

    root.setLinkedRecords(executions, 'nextVillageTaskExecutions', { villageId });
  }, [task, villageId]);

  const subscriptionUpdater = useMemo((): SelectorStoreUpdater<NextVillageTaskExecutionSubscriptionResponse> => updater(store => {
    return store.getRootField('nextVillageTaskExecutionChanged');
  }), [updater]);

  return (
    <>
      <h2>{label}</h2>
      <NextVillageTaskExecution
        task={task}
        timestamp={timestamp}
        resetUpdater={updater(store => store.getRootField('resetNextVillageTaskExecution'))}
        setUpdater={updater(store => store.getRootField('setNextVillageTaskExecution'))}
        subscriptionUpdater={subscriptionUpdater}
      />
    </>
  );
};

type Props = {
  readonly queryRef: PreloadedQuery<GeneralVillageOverviewQuery>;
};

export const GeneralVillageOverview: React.FC<Props> = ({ queryRef }) => {
  const { nextVillageTaskExecutions } = usePreloadedQuery(query, queryRef);

  return (
    <div>
      {nextVillageTaskExecutions.map(r => (
        <NextVillageTaskExecutionWrapper key={r.task} label={r.label} task={r.task} timestamp={r.timestamp} />
      ))}
    </div>
  );
};

GeneralVillageOverview.displayName = 'GeneralVillageOverview';