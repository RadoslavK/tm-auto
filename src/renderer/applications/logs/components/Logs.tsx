import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { LogsQuery } from '../../../_graphql/__generated__/LogsQuery.graphql';

import { LogEntry } from './LogEntry';

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

export const Logs: React.FC = () => {
  const { logEntries } = useLazyLoadQuery<LogsQuery>(logsQuery, {});

  return (
    <div>
      {logEntries.map(logEntry => (
        <LogEntry key={logEntry.timestamp.totalSeconds} logEntry={logEntry} />
      ))}
    </div>
  );
};
