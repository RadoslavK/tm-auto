import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { useSignOutMutation } from '../../signIn/hooks/useSignOutMutation';

export const SignOut: React.FC = React.forwardRef<any, any>((_pros, ref) => {
  const signOut = useSignOutMutation();

  const history = useHistory();

  const onSignOut = (): void => {
    history.push('/');
    signOut();
  };

  return (
    <Button
      ref={ref}
      color="secondary"
      onClick={onSignOut}
      variant="contained"
    >
      Sign out
    </Button>
  );
});