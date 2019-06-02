import React from 'react';
import { OperationVariables, Query, QueryProps } from 'react-apollo';

export class EnsuredQuery<TData extends {} = any, TVariables = OperationVariables> extends React.Component<QueryProps<TData, TVariables>> {
  render() {
    const {
      children,
      ...props
    } = this.props;

    return <Query {...props}>
      {(result) => {
        if (!result.data || result.loading) {
          return null;
        }

        return <>{children(result)}</>;
      }}
    </Query>
  }
}
