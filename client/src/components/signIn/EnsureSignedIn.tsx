import { IsSignedIn } from '*/graphql_operations/controller.graphql';
import * as React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { IIsSignedInQuery } from '../../_types/graphql';
import { SignInForm } from './SignInForm';

export const EnsureSignedIn: React.FunctionComponent = (props) => {
  const { data, loading } = useQuery<IIsSignedInQuery>(IsSignedIn);

  if (loading) {
    return null;
  }

  if (!data || !data.isSignedIn) {
    return <SignInForm />;
  }

  return <>{props.children}</>;
};
