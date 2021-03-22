import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { PropsWithChildren } from 'react';
import { useMutation } from 'react-relay/hooks';
import { useHistory } from 'react-router-dom';

const signOutMutation = graphql`
  mutation SignOutSignOutMutation {
      signOut
  }
`;

export const SignOut: React.FC = React.forwardRef<HTMLButtonElement, PropsWithChildren<{}>>((_pros, ref) => {
  const [signOut] = useMutation(signOutMutation);

  const history = useHistory();

  const onSignOut = async () => {
    signOut({ variables: {} });
    history.push('/');
  };

  return (
    <Button ref={ref} color="secondary" onClick={onSignOut} variant="contained">
      Sign out
    </Button>
  );
});
