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
} from '../../_types/graphql';

interface IResult {
  readonly loading: boolean;
  readonly botState: BotState | undefined;
}

export const useBotState = (): IResult => {
  const { data, loading, refetch } = useQuery<IGetBotStateQuery>(GetBotState);

  useSubscription(OnBotRunningChanged, {
    onSubscriptionData: () => refetch(),
  });

  return {
    loading,
    botState: data && data.botState,
  };
};