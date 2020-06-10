import { useEffect } from 'react';

import {
  OnLogEntryAddedDocument,
  OnLogEntryAddedSubscription,
  OnLogEntryAddedSubscriptionVariables,
  useGetLogEntriesQuery,
} from '../../../_graphql/graphqlHooks';

export const useLogs = () => {
  const { data: queryData, loading: queryLoading, subscribeToMore } = useGetLogEntriesQuery();

  useEffect(() => {
    subscribeToMore<OnLogEntryAddedSubscription, OnLogEntryAddedSubscriptionVariables>({
      document: OnLogEntryAddedDocument,
      updateQuery: ({ logEntries }, { subscriptionData: { data } }) => ({ logEntries: [data.logEntryAdded].concat(logEntries) }),
    });
  }, [subscribeToMore]);

  return queryLoading || !queryData
    ? []
    : queryData.logEntries;
};