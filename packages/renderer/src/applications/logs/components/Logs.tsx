import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { LogsQuery } from '../../../_graphql/__generated__/LogsQuery.graphql.js';
import type { LogsSubscription } from '../../../_graphql/__generated__/LogsSubscription.graphql.js';
import { LogEntry } from './LogEntry.js';

const logsQuery = graphql`
  query LogsQuery {
      logEntries {
          id
          ...LogEntry_logEntry
      }
  }
`;

const logsSubscription = graphql`
  subscription LogsSubscription {
      logEntryAdded {
        ...LogEntry
      }
  }
`;

export const Logs: React.FC = () => {
  const { logEntries } = useLazyLoadQuery<LogsQuery>(logsQuery, {});

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<LogsSubscription> => ({
    subscription: logsSubscription,
    variables: {},
    updater: (store) => {
      const root = store.getRoot();
      const newRecord = store.getRootField('logEntryAdded');
      const oldLogs = root.getLinkedRecords('logEntries');

      oldLogs?.unshift(newRecord);
      root.setLinkedRecords(oldLogs, 'logEntries');
    },
  }), []);

  useSubscription(subscriptionConfig);

  return (
    <div>
      {logEntries.map(logEntry => (
        <LogEntry key={logEntry.id} logEntry={logEntry} />
      ))}
    </div>
  );
};
