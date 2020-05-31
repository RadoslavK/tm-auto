import { Button } from '@material-ui/core';
import React from 'react';

import { BotState } from '../../../_graphql/graphqlHooks';
import { useToggleBotState } from '../../../hooks/useToggleBotState';

const getToggleText = (botState: BotState): string => {
  switch (botState) {
    case BotState.Paused:
      return 'Start';

    case BotState.Running:
    case BotState.Stopping:
      return 'Stop';

    default:
      throw new Error(`Bot shouldnt be in this state (${BotState[botState]}) while navigation is rendered`);
  }
};

type Props = {
  readonly botState: BotState;
};

export const BotStateToggle: React.FC<Props> = React.forwardRef<any, Props>(({ botState }, ref) => {
  const toggleBotState = useToggleBotState();

  return (
    <Button
      ref={ref}
      color="primary"
      disabled={!toggleBotState}
      onClick={toggleBotState ?? undefined}
      variant="contained"
    >
      {getToggleText(botState)}
    </Button>
  );
});