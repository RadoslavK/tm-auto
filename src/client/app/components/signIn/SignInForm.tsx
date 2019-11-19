import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useMutation } from '@apollo/react-hooks';
import { SignIn } from '*/graphql_operations/user.graphql';
import { ISignInInput, ISignInMutation, ISignInMutationVariables } from '../../../_types/graphql';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignInForm: React.FC = () => {
  const classes = useStyles({});
  const [username, setUsername] = useState('Buckyx');
  const [password, setPassword] = useState('Speedas11');
  const [server, setServer] = useState('https://ts2.travian.com');

  const account: ISignInInput = {
    username,
    password,
    server,
  };

  const [executeSignIn] = useMutation<ISignInMutation, ISignInMutationVariables>(SignIn, {
    variables: { account },
  });

  const signIn = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    await executeSignIn();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={signIn}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="server"
            label="Server"
            name="server"
            autoComplete="server"
            autoFocus
            value={server}
            onChange={e => setServer(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
};
