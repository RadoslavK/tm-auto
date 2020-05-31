import {
  useEffect,
  useState,
} from 'react';

import {
  LogEntryFragment,
  useGetLogsQuery,
  useOnLogEntryAddedSubscription,
} from '../../../_graphql/graphqlHooks';

export const useLogs = () => {
  const [entries, setEntries] = useState<LogEntryFragment[]>([]);

  const queryResult = useGetLogsQuery();

  useEffect(() => {
    const { data, loading } = queryResult;

    if (loading || !data) {
      return;
    }

    setEntries([...data.logsEntries]);
  }, [queryResult]);

  useOnLogEntryAddedSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.loading || !subscriptionData.data) {
        return;
      }

      const entry = subscriptionData.data.onLogEntryAdded;

      setEntries(prevEntries => [...prevEntries, entry]);
    },
  });

  return entries;
};