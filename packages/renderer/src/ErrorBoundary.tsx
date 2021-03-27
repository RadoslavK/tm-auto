import React, { ReactNode } from 'react';
import { Redirect } from 'react-router-dom';

type Props = {
  readonly children: ReactNode;
};

type State = {
  readonly error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
  static displayName = 'ErrorBoundary';

  static getDerivedStateFromError = (error?: Error): State => ({ error });

  readonly state: State = {};

  render() {
    const { error } = this.state;

    if (!error) {
      return <>{this.props.children}</>;
    }

    return (
      <Redirect to="/" />
    );
  }
}