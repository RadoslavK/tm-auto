import {
  useQuery,
  useSubscription,
} from '@apollo/client';

import {
  GetBotState,
  OnBotRunningChanged,
} from '*/graphql_operations/controller.graphql';

import {
  BotState,
  GetBotStateQuery,
} from '../_graphql/types/graphql.type';

export const useBotState = (): BotState | null => {
  const { data, loading, refetch } = useQuery<GetBotStateQuery>(GetBotState);

  useSubscription(OnBotRunningChanged, {
    onSubscriptionData: () => refetch(),
  });

  return loading || !data
    ? null
    : data.botState;
};