import React, {
  useEffect,
  useState,
} from 'react';
import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import {
  GetLogs,
  OnLogEntryAdded,
} from '*/graphql_operations/logs.graphql';
import {
  IGetLogsQuery,
  ILogEntryFragmentFragment,
  IOnLogEntryAddedSubscription,
} from '../../../_types/graphql';
import { LogEntry } from './LogEntry';

const useLogs = () => {
  const { data, loading } = useQuery<IGetLogsQuery>(GetLogs);
  const [entries, setEntries] = useState<ILogEntryFragmentFragment[]>([]);
  useSubscription<IOnLogEntryAddedSubscription>(OnLogEntryAdded, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.loading || !subscriptionData.data) {
        return;
      }

      const entry = subscriptionData.data.onLogEntryAdded;
      setEntries(prevEntries => [...prevEntries, entry]);
    },
  });

  useEffect(() => {
    if (loading || !data) {
      return;
    }

    setEntries([...data.logsEntries]);
  }, [data, loading]);

  return entries;
};

export const Logs: React.FC = () => {
  const logEntries = useLogs();

  return (
    <div>
      {logEntries.map((logEntry) => (
        <LogEntry key={logEntry.id} logEntry={logEntry}/>
      ))}
    </div>
  );
};