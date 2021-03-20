import Button from '@material-ui/core/Button';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useMutation } from 'react-relay/hooks';

import { BotState } from '../../../_graphql/__generated__/NavigationQuery.graphql.js';

const getToggleText = (botState: BotState): string => {
  switch (botState) {
    case 'Paused':
      return 'Start';

    case 'Running':
    case 'Stopping':
      return 'Stop';

    default:
      throw new Error(
        `Bot shouldnt be in this state (${botState}) while navigation is rendered`,
      );
  }
};

type Props = {
  readonly botState: BotState;
};

const startBotMutation = graphql`
  mutation BotStateToggleStartBotMutation {
      startBot
  }
`;

const stopBotMutation = graphql`
    mutation BotStateToggleStopBotMutation {
        stopBot
    }
`;

export const BotStateToggle: React.FC<Props> = React.forwardRef<HTMLButtonElement, Props>(
  ({ botState }, ref) => {
    const [startBot] = useMutation(startBotMutation);
    const [stopBot] = useMutation(stopBotMutation);

    const isStopping = botState === 'Stopping';

    const toggleBotState = () => {
      if (botState === 'Stopping') {
        return;
      }

      if (botState === 'Running') {
        stopBot({
          variables: {},
        });
      } else if (botState === 'Paused') {
        startBot({
          variables: {},
        });
      }
    };

    return (
      <Button
        ref={ref}
        color="primary"
        disabled={isStopping}
        onClick={isStopping ? undefined : toggleBotState}
        variant="contained">
        {getToggleText(botState)}
      </Button>
    );
  },
);
