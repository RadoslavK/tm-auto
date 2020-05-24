import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';

import {
  GetBotState,
  OnBotRunningChanged,
} from '*/graphql_operations/controller.graphql';

import {
  BotState,
  IGetBotStateQuery,
} from '../_types/graphql';

export const useBotState = (): BotState | null => {
  const { data, loading, refetch } = useQuery<IGetBotStateQuery>(GetBotState);

  useSubscription(OnBotRunningChanged, {
    onSubscriptionData: () => refetch(),
  });

  return loading || !data
    ? null
    : data.botState;
};