import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useMemo,
} from 'react';
import {
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
  useQueryLoader,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type {
  GraphQLSubscriptionConfig,
  RecordProxy,
  RecordSourceSelectorProxy,
} from 'relay-runtime';
import type { SelectorStoreUpdater } from 'relay-runtime';

import type { GeneralVillageOverviewQuery } from '../../../_graphql/__generated__/GeneralVillageOverviewQuery.graphql.js';
import type { GeneralVillageOverviewSettingsSubscription } from '../../../_graphql/__generated__/GeneralVillageOverviewSettingsSubscription.graphql.js';
import type { GeneralVillageOverviewUpdateOrderMutation } from '../../../_graphql/__generated__/GeneralVillageOverviewUpdateOrderMutation.graphql.js';
import type { NextVillageTaskExecution_timestamp$key } from '../../../_graphql/__generated__/NextVillageTaskExecution_timestamp.graphql.js';
import type { VillageTaskType } from '../../../_graphql/__generated__/NextVillageTaskExecutionSetMutation.graphql.js';
import type { NextVillageTaskExecutionSubscriptionResponse } from '../../../_graphql/__generated__/NextVillageTaskExecutionSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';
import { TasksOrder } from './generalVillageOverview/TasksOrder.js';

graphql`
  fragment GeneralVillageOverview_generalVillageSettings on GeneralVillageSettings {
      tasksOrder
  }
`;

const query = graphql`
    query GeneralVillageOverviewQuery($villageId: ID!) {
        generalVillageSettings(villageId: $villageId) {
            ...GeneralVillageOverview_generalVillageSettings @relay(mask: false)
        }
        nextVillageTaskExecutions(villageId: $villageId) {
            label
            task
            timestamp {
                ...NextVillageTaskExecution_timestamp
            }
        }
    }
`;

const updateOrderMutation = graphql`
  mutation GeneralVillageOverviewUpdateOrderMutation($villageId: ID!, $order: [VillageTaskType!]!) {
      updateGeneralVillageSettingsOrder(villageId: $villageId, order: $order) {
          ...GeneralVillageOverview_generalVillageSettings
      }
  }
`;

const settingsSubscription = graphql`
    subscription GeneralVillageOverviewSettingsSubscription($villageId: ID!) {
        generalVillageSettingsUpdated(villageId: $villageId) {
            ...GeneralVillageOverview_generalVillageSettings
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
  readonly task: VillageTaskType;
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
      <h3>{label}</h3>
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

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  coolDowns: {
    marginRight: 72,
  },
});

type Props = {
  readonly queryRef: PreloadedQuery<GeneralVillageOverviewQuery>;
};

export const GeneralVillageOverview: React.FC<Props> = ({ queryRef }) => {
  const classes = useStyles();
  const villageId = useRecoilValue(selectedVillageIdState);
  const { generalVillageSettings, nextVillageTaskExecutions } = usePreloadedQuery(query, queryRef);

  const settingsSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<GeneralVillageOverviewSettingsSubscription> => ({
    subscription: settingsSubscription,
    variables: { villageId },
    updater: (store) => {
      const newRecord = store.getRootField('generalVillageSettingsUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'generalVillageSettings', { villageId });
    },
  }), [villageId]);

  useSubscription(settingsSubscriptionConfig);

  const [updateOrder] = useMutation<GeneralVillageOverviewUpdateOrderMutation>(updateOrderMutation);

  const onOrderUpdate = (order: ReadonlyArray<VillageTaskType>) => {
    updateOrder({
      variables: { villageId, order: [...order] },
      updater: (store) => {
        const newRecord = store.getRootField('updateGeneralVillageSettingsOrder');
        store.getRoot().setLinkedRecord(newRecord, 'generalVillageSettings', { villageId });
      },
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.coolDowns}>
        <h2>CoolDowns</h2>
        {nextVillageTaskExecutions.map(r => (
          <NextVillageTaskExecutionWrapper key={r.task} label={r.label} task={r.task} timestamp={r.timestamp} />
        ))}
      </div>

      <div>
        <h2>Tasks order</h2>
        <TasksOrder
          order={generalVillageSettings.tasksOrder}
          onChange={onOrderUpdate}
        />
      </div>
    </div>
  );
};

GeneralVillageOverview.displayName = 'GeneralVillageOverview';