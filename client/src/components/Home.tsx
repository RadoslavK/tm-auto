import React from 'react';
import axios from 'axios';
import { backend } from '../constants/backend';

interface IState {
  readonly started: boolean;
}

export class Home extends React.Component<{}, IState> {
  readonly state = {
    started: false,
  };

  private _start = async () => {
    const url = `${backend.url}/api/bot/start`;
    await axios.post(url);

    this.setState(() => ({ started: true }));
  };

  private _stop = async () => {
    const url = `${backend.url}/api/bot/stop`;
    await axios.post(url);

    this.setState(() => ({ started: false }));
  };

  render() {
    const {
      started,
    } = this.state;

    return (
      <div>
        <button
          onClick={started ? this._stop : this._start}
        >
          {started ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}
