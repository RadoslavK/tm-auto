import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import axios from 'axios';
import { backend } from '../constants/backend';

export const Home: React.FunctionComponent<{}> = () => {
  const [started, setStarted] = useState(false);

  const startBot = async () => {
    const url = `${backend.url}/api/bot/start`;
    await axios.post(url);

    setStarted(true);
  };

  const stopBot = async () => {
    const url = `${backend.url}/api/bot/stop`;
    await axios.post(url);

    setStarted(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={started ? stopBot : startBot}
      >
        {started ? 'Stop bot' : 'Start bot'}
      </Button>
    </div>
  );
};
