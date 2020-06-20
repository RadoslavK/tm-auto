import React from 'react';

import { useLogs } from '../hooks/useLogs';
import { LogEntry } from './LogEntry';

export const Logs: React.FC = () => {
  const logEntries = useLogs();

  return (
    <div>
      {logEntries.map((logEntry) => (
        <LogEntry key={logEntry.timestamp.totalSeconds} logEntry={logEntry} />
      ))}
    </div>
  );
};
