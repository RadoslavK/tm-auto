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

  const { data: queryData, loading: queryLoading } = useGetLogsQuery();

  useEffect(() => {
    if (!queryLoading && queryData) {
      setEntries([...queryData.logsEntries]);
    }
  }, [queryLoading, queryData]);

  useOnLogEntryAddedSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      if (subscriptionData.loading || !subscriptionData.data) {
        return;
      }

      const entry = subscriptionData.data.onLogEntryAdded;

      setEntries(prevEntries => [entry, ...prevEntries]);
    },
  });

  return entries;
};