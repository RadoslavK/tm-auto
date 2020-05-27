import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import {
  useEffect,
  useState,
} from 'react';

import {
  GetLogs,
  OnLogEntryAdded,
} from '*/graphql_operations/logs.graphql';

import {
  GetLogsQuery,
  LogEntryFragment,
  OnLogEntryAddedSubscription,
} from '../../../_types/graphql';

export const useLogs = () => {
  const queryResult = useQuery<GetLogsQuery>(GetLogs);
  const [entries, setEntries] = useState<LogEntryFragment[]>([]);

  useSubscription<OnLogEntryAddedSubscription>(OnLogEntryAdded, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.loading || !subscriptionData.data) {
        return;
      }

      const entry = subscriptionData.data.onLogEntryAdded;

      setEntries(prevEntries => [...prevEntries, entry]);
    },
  });

  useEffect(() => {
    const { data, loading } = queryResult;

    if (loading || !data) {
      return;
    }

    setEntries([...data.logsEntries]);
  }, [queryResult]);

  return entries;
};