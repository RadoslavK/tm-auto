import { Button } from '@material-ui/core';
import { gql } from 'apollo-boost';
import React from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import { IsBotRunningQuery } from './_types/IsBotRunningQuery';
import { StartBotMutation } from './_types/StartBotMutation';
import { StopBotMutation } from './_types/StopBotMutation';

const isBotRunningQuery = gql`
  query IsBotRunningQuery {
      isBotRunning
  }
`;

const startBotMutation = gql`
  mutation StartBotMutation {
      startBot
  }
`;

const stopBotMutation = gql`
    mutation StopBotMutation {
        stopBot
    }
`;

export const Home: React.FunctionComponent = () => {
  const { data, loading } = useQuery<IsBotRunningQuery>(isBotRunningQuery);
  const startBot = useMutation<StartBotMutation>(startBotMutation, {
    refetchQueries: [{ query: isBotRunningQuery }],
  });
  const stopBot = useMutation<StopBotMutation>(stopBotMutation, {
    refetchQueries: [{ query: isBotRunningQuery }],
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
