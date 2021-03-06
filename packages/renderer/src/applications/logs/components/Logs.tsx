import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { LogsQuery } from '../../../_graphql/__generated__/LogsQuery.graphql.js';
import type { LogsSubscription } from '../../../_graphql/__generated__/LogsSubscription.graphql.js';
import { LogEntry } from './LogEntry.js';

graphql`
    fragment Logs_logEntry on LogEntry {
        id
        ...LogEntry_logEntry
    }
`;

export const logsQuery = graphql`
  query LogsQuery {
      logEntries {
         ...Logs_logEntry @relay (mask: false)
      }
  }
`;

const logsSubscription = graphql`
  subscription LogsSubscription {
      logEntryAdded {
        ...Logs_logEntry
      }
  }
`;

type Props = {
  readonly queryRef: PreloadedQuery<LogsQuery>;
};

export const Logs: React.FC<Props> = ({ queryRef }) => {
  const { logEntries } = usePreloadedQuery(logsQuery, queryRef);

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

Logs.displayName = 'Logs';