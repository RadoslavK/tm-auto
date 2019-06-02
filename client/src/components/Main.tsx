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

  render() {
    const style = { color: 'green' };

    if (this.state.started) {
      return <h1 style={style}>Started</h1>;
    }

    return (
      <div>
        <h1>Travian App</h1>
        <button
          onClick={this._start}
          disabled={this.state.started}
        >
          Start
        </button>
      </div>
    );
  }
}
