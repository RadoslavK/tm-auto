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
  IGetLogsQuery,
  ILogEntryFragment,
  IOnLogEntryAddedSubscription,
} from '../../../../_types/graphql';

export const useLogs = () => {
  const queryResult = useQuery<IGetLogsQuery>(GetLogs);
  const [entries, setEntries] = useState<ILogEntryFragment[]>([]);

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
    const { data, loading } = queryResult;

    if (loading || !data) {
      return;
    }

    setEntries([...data.logsEntries]);
  }, [queryResult]);

  return entries;
};