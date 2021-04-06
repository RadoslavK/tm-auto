import React, { ReactNode } from 'react';
import {
  Redirect,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

type Props = RouteComponentProps & {
  readonly children: ReactNode;
};

type State = {
  readonly hasError: boolean;
};

class ErrorBoundaryComponent extends React.Component<Props, State> {
  static displayName = 'ErrorBoundary';

  static getDerivedStateFromError = (): State => ({ hasError: true });

  readonly state: State = {
    hasError: false,
  };

  private unregisterHistoryListener?: () => void = undefined;

  componentDidMount() {
    this.unregisterHistoryListener = this.props.history.listen(() => {
      this.setState({ hasError: false });
    });
  }

  componentWillUnmount() {
    this.unregisterHistoryListener?.();
  }

  render() {
    const { hasError } = this.state;

    if (!hasError) {
      return <>{this.props.children}</>;
    }

    return (
      <Redirect to="/" />
    );
  }
}

export const ErrorBoundary = withRouter(ErrorBoundaryComponent);