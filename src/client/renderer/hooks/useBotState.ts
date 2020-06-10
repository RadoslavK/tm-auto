import { useEffect } from 'react';

import {
  OnBotRunningChangedDocument,
  OnBotRunningChangedSubscription,
  OnBotRunningChangedSubscriptionVariables,
  useGetBotStateQuery,
} from '../_graphql/graphqlHooks';
import { BotState } from '../../../_shared/types/botState';

export const useBotState = (): BotState | null => {
  const { data: queryData, loading: queryLoading, subscribeToMore } = useGetBotStateQuery();

  useEffect(() => {
    subscribeToMore<OnBotRunningChangedSubscription, OnBotRunningChangedSubscriptionVariables>({
      document: OnBotRunningChangedDocument,
      updateQuery: (_prev, { subscriptionData: { data } }) => ({ botState: data.botStateChanged }),
    });
  }, [subscribeToMore]);

  return queryLoading || !queryData
    ? null
    : queryData.botState;
};