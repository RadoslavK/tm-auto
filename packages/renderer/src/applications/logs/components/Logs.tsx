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
          timestamp {
              totalSeconds
          }
          ...LogEntry_logEntry
      }
  }
`;

const logsSubscription = graphql`
  subscription LogsSubscription {
      logEntryAdded {
          timestamp {
              totalSeconds
          }
          ...LogEntry_logEntry
      }
  }
`;

export const Logs: React.FC = () => {
  const { logEntries } = useLazyLoadQuery<LogsQuery>(logsQuery, {});

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<LogsSubscription> => ({
    subscription: logsSubscription,
    variables: {},
    updater: (store, data) => {
      const root = store.getRoot();
      const oldLogs = root.getLinkedRecords('logEntries');

      if (!oldLogs) {
        return;
      }

      const newRecord = store.create(data.logEntryAdded.timestamp.totalSeconds.toString(), 'LogEntry');
      const newLogs = oldLogs.concat([newRecord]);
      root.setLinkedRecords(newLogs, 'logEntries');
    },
  }), []);

  useSubscription(subscriptionConfig);

  return (
    <div>
      {logEntries.map(logEntry => (
        <LogEntry key={logEntry.timestamp.totalSeconds} logEntry={logEntry} />
      ))}
    </div>
  );
};
