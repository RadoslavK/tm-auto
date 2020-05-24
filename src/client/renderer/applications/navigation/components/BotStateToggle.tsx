import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { BotState } from '../../../_types/graphql';
import { useBotState } from '../../../hooks/useBotState';
import { useToggleBotState } from '../../../hooks/useToggleBotState';
import { useSignOutMutation } from '../../signIn/hooks/useSignOutMutation';

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

export const BotStateToggle: React.FC = React.forwardRef<HTMLDivElement, any>((_props, ref) => {
  const botState = useBotState();
  const toggleBotState = useToggleBotState();
  const signOut = useSignOutMutation();

  const history = useHistory();

  if (!botState) {
    return null;
  }

  const onSignOut = (): void => {
    history.push('/');
    signOut();
  };

  return (
    <div ref={ref}>
      <Button
        color="primary"
        disabled={!toggleBotState}
        onClick={toggleBotState ?? undefined}
        variant="contained"
      >
        {getToggleText(botState)}
      </Button>
      {botState === BotState.Paused && (
        <Button
          color="secondary"
          onClick={onSignOut}
          variant="contained"
        >
          Sign out
        </Button>
      )}
    </div>
  );
});