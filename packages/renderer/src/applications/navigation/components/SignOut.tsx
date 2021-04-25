import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { PropsWithChildren } from 'react';
import { useMutation } from 'react-relay/hooks';
import { useNavigate } from 'react-router-dom';

const signOutMutation = graphql`
  mutation SignOutSignOutMutation {
      signOut
  }
`;

export const SignOut: React.FC = React.forwardRef<HTMLButtonElement, PropsWithChildren<{}>>((_pros, ref) => {
  const [signOut] = useMutation(signOutMutation);

  const navigate = useNavigate();

  const onSignOut = async () => {
    signOut({
      variables: {},
      optimisticUpdater: (store) => {
        store.getRoot().setValue('None', 'botState');
      },
    });

    navigate('/');
  };

  return (
    <Button ref={ref} color="secondary" onClick={onSignOut} variant="text">
      Sign out
    </Button>
  );
});

SignOut.displayName = 'SignOut';