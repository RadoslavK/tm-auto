import { IsBotRunning, StartBot, StopBot } from '*/graphql_operations/controller.graphql';
import { Button } from '@material-ui/core';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { IIsBotRunningQuery, IStartBotMutation, IStopBotMutation } from '../_types/graphql';

export const Home: React.FunctionComponent = () => {
  const { data, loading } = useQuery<IIsBotRunningQuery>(IsBotRunning);
  const startBot = useMutation<IStartBotMutation>(StartBot, {
    refetchQueries: [{ query: IsBotRunning }],
  });
  const stopBot = useMutation<IStopBotMutation>(StopBot, {
    refetchQueries: [{ query: IsBotRunning }],
  });

  if (loading) {
    return null;
  }

  const {
    isBotRunning,
  } = data;

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={async e => {
        e.preventDefault();

        await isBotRunning ? stopBot() : startBot();
      }}
    >
      {isBotRunning ? 'Stop bot' : 'Start bot'}
    </Button>
  );
};
