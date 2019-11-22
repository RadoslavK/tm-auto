import * as React from 'react';
import {
  useQuery,
} from '@apollo/react-hooks';
import { IIsSignedInQuery } from '../../../_types/graphql';
import { SignInForm } from './SignInForm';
import { IsSignedIn } from '*/graphql_operations/user.graphql';

export const EnsureSignedIn: React.FC = (props) => {
  const { data, loading } = useQuery<IIsSignedInQuery>(IsSignedIn);

  if (loading) {
    return null;
  }

  if (!data || !data.isSignedIn) {
    return <SignInForm />;
  }

  return <>{props.children}</>;
};
