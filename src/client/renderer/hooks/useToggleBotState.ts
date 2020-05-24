import { useMutation } from '@apollo/react-hooks';

import {
  StartBot,
  StopBot,
} from '*/graphql_operations/controller.graphql';

import {
  BotState,
  IStartBotMutation,
  IStopBotMutation,
} from '../_types/graphql';
import { useBotState } from './useBotState';

export const useToggleBotState = (): (() => Promise<void>) | null => {
  const botState = useBotState();
  const [startBot] = useMutation<IStartBotMutation>(StartBot);
  const [stopBot] = useMutation<IStopBotMutation>(StopBot);

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