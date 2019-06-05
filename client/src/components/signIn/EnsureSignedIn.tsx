import { gql } from 'apollo-boost';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';
import { IsSignedInQuery } from './_types/IsSignedInQuery';
import { SignInForm } from './SignInForm';

export const isSignedInQuery = gql`
  query IsSignedInQuery {
      isSignedIn
  }
`;

export const EnsureSignedIn: React.FunctionComponent = (props) => {
  const { data, loading } = useQuery<IsSignedInQuery>(isSignedInQuery);

  if (loading) {
    return null;
  }

  if (!data || !data.isSignedIn) {
    return <SignInForm />;
  }

  return <>{props.children}</>;
};
