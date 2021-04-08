import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useMutation } from 'react-relay/hooks';

import type { BotState } from '../../../_graphql/__generated__/NavigationQuery.graphql.js';

const getToggleText = (botState: BotState): string => {
  switch (botState) {
    case 'Paused':
      return 'Start';

    case 'InitialScanning':
      return 'Scanning initial villages';

    case 'Running':
    case 'Stopping':
      return 'Stop';

    default:
      throw new Error(
        `Bot shouldn't be in this state (${botState}) while navigation is rendered`,
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

    const disabled = botState === 'Stopping' || botState === 'InitialScanning';

    const toggleBotState = () => {
      if (botState === 'Running') {
        stopBot({
          variables: {},
          optimisticUpdater: (store) => {
            store.getRoot().setValue('Stopping', 'botState');
          },
        });
      } else if (botState === 'Paused') {
        startBot({
          variables: {},
          optimisticUpdater: (store) => {
            store.getRoot().setValue('Running', 'botState');
          },
        });
      }
    };

    return (
      <Button
        ref={ref}
        color="primary"
        disabled={disabled}
        onClick={disabled ? undefined : toggleBotState}
        variant="contained"
      >
        {getToggleText(botState)}
      </Button>
    );
  },
);

BotStateToggle.displayName = 'BotStateToggle';