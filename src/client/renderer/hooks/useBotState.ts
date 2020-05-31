
import {
  BotState,
  useGetBotStateQuery,
  useOnBotRunningChangedSubscription,
} from '../_graphql/graphqlHooks';

export const useBotState = (): BotState | null => {
  const { data, loading, refetch } = useGetBotStateQuery();

  useOnBotRunningChangedSubscription({
    onSubscriptionData: () => {
      refetch();
    },
  });

  return loading || !data
    ? null
    : data.botState;
};