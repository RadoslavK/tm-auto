import React from 'react';
import axios from 'axios';
import { backend } from '../constants/backend';

interface IState {
  readonly started: boolean;
}

export class Main extends React.Component<{}, IState> {
  readonly state = {
    started: false,
  };

  private _start = async () => {
    const url = `${backend.url}/api/start`;
    await axios.post(url);

    this.setState(() => ({ started: true }));
  };

  private _stop = async () => {
    const url = `${backend.url}/api/stop`;
    await axios.post(url);

    this.setState(() => ({ started: false }));
  };

  render() {
    const {
      started,
    } = this.state;

    return (
      <div>
        <h1>Travian App</h1>
        <button
          onClick={started ? this._stop : this._start}
        >
          {started ? 'Stop' : 'Start'}
        </button>
      </div>
    );
  }
}
