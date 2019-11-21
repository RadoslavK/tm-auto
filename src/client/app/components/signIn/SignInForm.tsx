import React, {
  useEffect,
  useState,
} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useMutation } from '@apollo/react-hooks';
import {
  Icon,
  IconButton,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import { SignIn } from '*/graphql_operations/user.graphql';
import {
  ICreateAccountMutation,
  ICreateAccountMutationVariables,
  IGetAccountsQuery,
  ISignInMutation,
  ISignInMutationVariables,
  IUserAccountInput,
} from '../../../_types/graphql';
import { Accounts } from './Accounts';
import {
  CreateAccount,
  GetAccounts,
} from "*/graphql_operations/account.graphql";

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
  errorIcon: {
    fontSize: 20,
  },
  errorIconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  errorMessage: {
    display: 'flex',
    alignItems: 'center',
  },
  errorSnackbarContent: {
    backgroundColor: theme.palette.error.dark,
  },
  errorMargin: {
    margin: theme.spacing(1),
  },
}));

type AccountType = IGetAccountsQuery['accounts'][0];

export const SignInForm: React.FC = () => {
  const classes = useStyles();

  const [selectedAccountId, setSelectedAccountId] = useState<AccountType['id']>();
  const [accountExistsError, setAccountExistsError] = useState(false);
  const [username, setUsername] = useState('Buckyx');
  const [password, setPassword] = useState('Speedas11');
  const [server, setServer] = useState('https://tx3.travian.com.vn');

  const account: IUserAccountInput = {
    username,
    password,
    server,
  };

  const [executeSignIn] = useMutation<ISignInMutation, ISignInMutationVariables>(SignIn, {
    variables: { account },
  });

  const [createAccount, createAccountResult] = useMutation<ICreateAccountMutation, ICreateAccountMutationVariables>(CreateAccount, {
    variables: { account },
    refetchQueries: [{ query: GetAccounts }],
  });

  useEffect(() => {
    if (createAccountResult.loading || !createAccountResult.data) {
      return;
    }

    const newAccountId = createAccountResult.data.createAccount;

    if(newAccountId) {
      setSelectedAccountId(newAccountId);
      setAccountExistsError(false);
    } else {
      setAccountExistsError(true);
    }
  }, [createAccountResult]);

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
        >
          <Accounts
            selectedId={selectedAccountId}
            onSelected={acc => {
              setUsername(acc.username);
              setPassword(acc.password);
              setServer(acc.server);
              setSelectedAccountId(acc.id);
            }}
          />
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
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => executeSignIn()}
          >
            Sign In
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={() => createAccount()}
          >
            Create account
          </Button>
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={accountExistsError}
            autoHideDuration={3000}
            onClose={() => setAccountExistsError(false)}
          >
            <SnackbarContent
              className={classNames(classes.errorSnackbarContent, classes.errorMargin)}
              message={(
                <span className={classes.errorMessage}>
                  <Icon className={classNames(classes.errorIcon, classes.errorIconVariant)} />
                  Account already exists
                </span>
              )}
              action={[
                <IconButton key="close" color="inherit" onClick={() => setAccountExistsError(false)}>
                  <CloseIcon className={classes.errorIcon} />
                </IconButton>
              ]}
            />
          </Snackbar>
        </form>
      </div>
    </Container>
  );
};
