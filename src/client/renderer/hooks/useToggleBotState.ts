import {
  BotState,
  useStartBotMutation,
  useStopBotMutation,
} from '../_graphql/graphqlHooks';
import { useBotState } from './useBotState';

export const useToggleBotState = (): (() => Promise<void>) | null => {
  const botState = useBotState();

  const [startBot] = useStartBotMutation();
  const [stopBot] = useStopBotMutation();

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