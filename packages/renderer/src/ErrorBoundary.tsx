import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  readonly children: ReactNode;
  readonly onReload: () => void;
};

type State = {
  readonly hasError: boolean;
};

class ErrorBoundary extends React.Component<Props, State> {
  static displayName = 'ErrorBoundary';

  static getDerivedStateFromError = (): State => ({ hasError: true });

  readonly state: State = {
    hasError: false,
  };

  componentDidUpdate() {
    if (this.state.hasError) {
      this.props.onReload();
      this.setState({ hasError: false });
    }
  }

  render() {
    const { hasError } = this.state;

    if (!hasError) {
      return <>{this.props.children}</>;
    }

    return null;
  }
}

export const ErrorBoundaryContainer: React.FC = ({ children }) => {
  const navigate = useNavigate();

  return (
    <ErrorBoundary onReload={() => navigate('/')}>
      {children}
    </ErrorBoundary>
  );
};

ErrorBoundaryContainer.defaultProps = 'ErrorBoundaryContainer';

export { ErrorBoundaryContainer as ErrorBoundary };