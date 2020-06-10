import { Tooltip } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  AccountInput,
  useGetAccountLazyQuery,
  useIsAccountTakenQuery,
} from '../../../_graphql/graphqlHooks';
import { SignInFormDialogType } from './SignInForm';

const useStyles = makeStyles(theme => ({
  form: {
    // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    width: '100%',
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(8),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Props = {
  readonly onSubmit: (account: AccountInput) => void;
  readonly selectedAccountId: string | null | undefined;
  readonly type: SignInFormDialogType;
};

export const SignInFormDialog: React.FC<Props> = ({
  onSubmit,
  selectedAccountId,
  type,
}) => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [server, setServer] = useState('');

  const account: AccountInput = {
    password,
    server,
    username,
  };

  const [getAccount] = useGetAccountLazyQuery({
    onCompleted: (accountData) => {
      setUsername(accountData.account.username);
      setPassword(accountData.account.password);
      setServer(accountData.account.server);
    },
  });

  const { data: accountExistData } = useIsAccountTakenQuery({
    fetchPolicy: 'no-cache',
    variables: { account },
    skip: type === SignInFormDialogType.Update,
  });

  useEffect(() => {
    if (type === SignInFormDialogType.Update && selectedAccountId) {
      getAccount({ variables: { id: selectedAccountId } });
    }
  }, [type, selectedAccountId, getAccount]);

  const submitAccount = (): void => {
    onSubmit(account);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Typography
          component="h1"
          variant="h5"
        >
          {type === SignInFormDialogType.Update ? 'Update' : 'Create new'}
        </Typography>
        <div className={classes.form}>
          <TextField
            autoComplete="username"
            autoFocus
            disabled={type === SignInFormDialogType.Update}
            fullWidth
            id="username"
            label="Username"
            margin="normal"
            name="username"
            onChange={e => setUsername(e.target.value)}
            required
            value={username}
            variant="outlined"
          />
          <TextField
            autoComplete="current-password"
            fullWidth
            id="password"
            label="Password"
            margin="normal"
            name="password"
            onChange={e => setPassword(e.target.value)}
            required
            type="password"
            value={password}
            variant="outlined"
          />
          <TextField
            autoComplete="server"
            autoFocus
            disabled={type === SignInFormDialogType.Update}
            fullWidth
            id="server"
            label="Server"
            margin="normal"
            name="server"
            onChange={e => setServer(e.target.value)}
            required
            value={server}
            variant="outlined"
          />
          <Tooltip title={accountExistData?.isAccountTaken ? 'Account already exists' : ''}>
            <span>
              <Button
                className={classes.submit}
                color="primary"
                disabled={accountExistData?.isAccountTaken || !server || !username || !password}
                fullWidth
                onClick={submitAccount}
                variant="contained"
              >
                Submit
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
    </Container>
  );
};