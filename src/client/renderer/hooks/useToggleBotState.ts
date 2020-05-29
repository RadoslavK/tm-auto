import { useMutation } from '@apollo/react-hooks';

import {
  StartBot,
  StopBot,
} from '*/graphql_operations/controller.graphql';

import {
  BotState,
  StartBotMutation,
  StopBotMutation,
} from '../_graphql/types/graphql.type';
import { useBotState } from './useBotState';

export const useToggleBotState = (): (() => Promise<void>) | null => {
  const botState = useBotState();
  const [startBot] = useMutation<StartBotMutation>(StartBot);
  const [stopBot] = useMutation<StopBotMutation>(StopBot);

  if (botState === BotState.Stopping) {
    return null;
  }

  return async (): Promise<void> => {
    if (botState === BotState.Running) {
      await stopBot();
    } else if (botState === BotState.Paused) {
      await startBot();
    }
  };
};