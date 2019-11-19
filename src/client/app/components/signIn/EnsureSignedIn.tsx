import * as React from 'react';
import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import { IIsSignedInQuery } from '../../../_types/graphql';
import { SignInForm } from './SignInForm';
import { OnSignedToggled, IsSignedIn } from '*/graphql_operations/user.graphql';

export const EnsureSignedIn: React.FC = (props) => {
  const { data, loading, refetch } = useQuery<IIsSignedInQuery>(IsSignedIn);

  useSubscription(OnSignedToggled, {
    onSubscriptionData: () => refetch(),
  });

  if (loading) {
    return null;
  }

  if (!data || !data.isSignedIn) {
    return <SignInForm />;
  }

  return <>{props.children}</>;
};
