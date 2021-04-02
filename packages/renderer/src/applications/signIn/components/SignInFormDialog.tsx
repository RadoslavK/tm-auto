import {
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Tooltip,
  Typography,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  fetchQuery,
  useLazyLoadQuery,
  useRelayEnvironment,
} from 'react-relay/hooks';

import type { SignInFormCreateAccountMutationVariables } from '../../../_graphql/__generated__/SignInFormCreateAccountMutation.graphql.js';
import type { SignInFormDialogIsAccountTakenQuery } from '../../../_graphql/__generated__/SignInFormDialogIsAccountTakenQuery.graphql.js';
import type { SignInFormDialogQuery } from '../../../_graphql/__generated__/SignInFormDialogQuery.graphql.js';
import { SignInFormDialogType } from './SignInForm.js';

const useStyles = makeStyles((theme) => ({
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
  readonly onSubmit: (account: SignInFormCreateAccountMutationVariables['account']) => void;
  readonly selectedAccountId: string | null | undefined;
  readonly type: SignInFormDialogType;
};

export const signInFormDialogAccountQuery = graphql`
  query SignInFormDialogQuery($id: ID!, $skip: Boolean!) {
      account(id: $id) @skip(if: $skip) {
          password
          server
          username
      }
  }
`;

const isAccountTakenQuery = graphql`
  query SignInFormDialogIsAccountTakenQuery($account: AccountInput!, $skip: Boolean!) {
      isAccountTaken(account: $account) @skip(if: $skip)
  }
`;

export const SignInFormDialog: React.FC<Props> = ({
  onSubmit,
  selectedAccountId,
  type,
}) => {
  const classes = useStyles();

  const { account } = useLazyLoadQuery<SignInFormDialogQuery>(signInFormDialogAccountQuery, {
    id: selectedAccountId || '',
    skip: type !== SignInFormDialogType.Update || !selectedAccountId,
  }, { fetchPolicy: 'network-only' });

  const [username, setUsername] = useState(account?.username ?? '');
  const [password, setPassword] = useState(account?.password ?? '');
  const [server, setServer] = useState(account?.server ?? '');

  const newAccount = useMemo((): SignInFormCreateAccountMutationVariables['account'] => ({
    password,
    server,
    username,
  }), [username, password, server]);

  // TODO rewrite when React supports Concurrent rendering so the suspense wont trigger on each form change
  //  Suspended = Component unmounts and user loses focus from the input
  const relayEnvironment = useRelayEnvironment();
  const [isAccountTaken, setIsAccountTaken] = useState<boolean>(false);
  useEffect(() => {
    fetchQuery<SignInFormDialogIsAccountTakenQuery>(relayEnvironment, isAccountTakenQuery, {
      account: newAccount,
      skip: type === SignInFormDialogType.Update,
    }, { fetchPolicy: 'network-only' })
      .subscribe({
        next: (response) => {
          setIsAccountTaken(!!response.isAccountTaken);
        },
      });
  }, [relayEnvironment, newAccount, type]);

  //  TODO dont cache this in Relay devtools at least it still shows cached
  // const { isAccountTaken } = useLazyLoadQuery<SignInFormDialogIsAccountTakenQuery>(
  //   isAccountTakenQuery,
  //   {
  //     account: newAccount,
  //     skip: type === SignInFormDialogType.Update,
  //   },
  //   { fetchPolicy: 'network-only' },
  // );

  const submitAccount = () => onSubmit(newAccount);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
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
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
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
            onChange={(e) => setServer(e.target.value)}
            required
            value={server}
            variant="outlined"
          />
          <Tooltip
            title={
              isAccountTaken ? 'Account already exists' : ''
            }>
            <span>
              <Button
                className={classes.submit}
                color="primary"
                disabled={
                  isAccountTaken ||
                  !server ||
                  !username ||
                  !password
                }
                fullWidth
                onClick={submitAccount}
                variant="contained">
                Submit
              </Button>
            </span>
          </Tooltip>
        </div>
      </div>
    </Container>
  );
};

SignInFormDialog.displayName = 'SignInFormDialog';