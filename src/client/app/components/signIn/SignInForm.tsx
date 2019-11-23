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
import {
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  Snackbar,
  SnackbarContent,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';
import { green } from '@material-ui/core/colors';
import {
  BotState,
  ICreateAccountMutation,
  ICreateAccountMutationVariables,
  ICreateUserAccountInput,
  IDeleteAccountMutation,
  IDeleteAccountMutationVariables,
  IGetAccountQuery,
  IGetAccountQueryVariables,
  IGetAccountsQuery,
  ISignInMutation,
  ISignInMutationVariables,
  IUpdateAccountMutation,
  IUpdateAccountMutationVariables,
  IUpdateUserAccountInput,
} from '../../../_types/graphql';
import { Accounts } from './Accounts';
import {
  CreateAccount,
  DeleteAccount,
  GetAccount,
  GetAccounts,
  UpdateAccount,
} from "*/graphql_operations/account.graphql";
import { SignIn } from '*/graphql_operations/controller.graphql';
import { useBotState } from '../../hooks/useBotState';

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
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  snackbarContent: {
    backgroundColor: green[600],
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

type AccountType = IGetAccountsQuery['accounts'][0];

enum DialogType {
  None = 'none',
  Create = 'create',
  Update = 'update',
  Delete = 'delete',
}

interface IFormDialogProps {
  readonly type: DialogType;
  readonly selectedAccountId: string;
  readonly onUpdate: (success: boolean) => void;
  readonly onCreate: (newAccountId: string | null) => void;
}

const FormDialog: React.FC<IFormDialogProps> = (props) => {
  const {
    onCreate,
    onUpdate,
    selectedAccountId,
    type,
  } = props;

  const classes = useStyles();

  const { loading, data } = useQuery<IGetAccountQuery, IGetAccountQueryVariables>(GetAccount, {
    variables: { accountId: selectedAccountId },
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [server, setServer] = useState('');

  useEffect(() => {
    if (!loading && data && data.account && type === DialogType.Update) {
      setUsername(data.account.username);
      setPassword(data.account.password);
      setServer(data.account.server);
    }
  }, [data, loading, type]);

  const newAccount: ICreateUserAccountInput = {
    server,
    password,
    username,
  };

  const updatedAccount: IUpdateUserAccountInput = {
    ...newAccount,
    id: selectedAccountId,
  };

  const [createAccount, createAccountResult] = useMutation<ICreateAccountMutation, ICreateAccountMutationVariables>(CreateAccount, {
    variables: { account: newAccount },
    refetchQueries: [{ query: GetAccounts }],
  });

  const [updateAccount, updateAccountResult] = useMutation<IUpdateAccountMutation, IUpdateAccountMutationVariables>(UpdateAccount, {
    variables: { account: updatedAccount },
    refetchQueries: [{ query: GetAccounts }],
  });

  useEffect(() => {
    if (createAccountResult.loading || !createAccountResult.data) {
      return;
    }

    const newAccountId = createAccountResult.data.createAccount;

    onCreate(newAccountId || null);
  }, [createAccountResult, onCreate]);

  useEffect(() => {
    if (updateAccountResult.loading || !updateAccountResult.data) {
      return;
    }

    onUpdate(updateAccountResult.data.updateAccount);
  }, [updateAccountResult, onUpdate]);

  const submitAccount = () => {
    if (type === DialogType.Update) {
      updateAccount();
    } else {
      createAccount();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {type === DialogType.Update ? 'Update' : 'Create new'}
        </Typography>
        <div className={classes.form}>
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
            disabled={!server || !username || !password}
            onClick={() => submitAccount()}
          >
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
};

export const SignInForm: React.FC = () => {
  const classes = useStyles();

  const [selectedAccountId, setSelectedAccountId] = useState<AccountType['id']>('');
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState(false);

  const { loading, botState } = useBotState();

  const [dialogType, setDialogType] = useState(DialogType.None);

  const [executeSignIn] = useMutation<ISignInMutation, ISignInMutationVariables>(SignIn, {
    variables: { accountId: selectedAccountId },
  });

  const [deleteAccount, deleteAccountResult] = useMutation<IDeleteAccountMutation, IDeleteAccountMutationVariables>(DeleteAccount, {
    variables: { accountId: selectedAccountId },
    refetchQueries: [{ query: GetAccounts }],
  });

  useEffect(() => {
    if (deleteAccountResult.loading || !deleteAccountResult.data) {
      return;
    }

    setDialogType(DialogType.None);
    setSubmitMessage('Account deleted');
    setShowSubmitMessage(true);
  }, [deleteAccountResult]);

  const onUpdate = (success: boolean): void => {
    if (!success) {
      setSubmitError(true);
    } else {
      setSubmitMessage('Account updated');
    }

    setDialogType(DialogType.None);
    setShowSubmitMessage(true);
  };

  const onCreate = (newAccountId: string | null): void => {
    if (!newAccountId) {
      setSubmitError(true);
    } else {
      setSelectedAccountId(newAccountId);
      setSubmitMessage('Account created');
    }

    setDialogType(DialogType.None);
    setShowSubmitMessage(true);
  };

  if (loading) {
    return null;
  }

  const disabled = botState === BotState.Pending;

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className={classes.form}>
            <Accounts
              disabled={disabled}
              selectedId={selectedAccountId}
              onSelectedId={setSelectedAccountId}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={disabled || !selectedAccountId}
              onClick={() => executeSignIn()}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
              disabled={disabled}
              onClick={() => setDialogType(DialogType.Create)}
            >
              Create account
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              className={classes.submit}
              disabled={disabled || !selectedAccountId}
              onClick={() => setDialogType(DialogType.Update)}
            >
              Update account
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              className={classes.submit}
              disabled={disabled || !selectedAccountId}
              onClick={() => setDialogType(DialogType.Delete)}
            >
              Delete account
            </Button>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={showSubmitMessage}
              autoHideDuration={3000}
              onClose={() => {
                setShowSubmitMessage(false);
                setSubmitError(false);
              }}
            >
              <SnackbarContent
                className={classNames(classes.snackbarContent, classes.margin)}
                message={(
                  <span className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {submitError && <span>Account already exists</span>}
                    {!submitError && <span>{submitMessage}</span>}
                  </span>
                )}
                action={[
                  <IconButton key="close" color="inherit" onClick={() => {
                    setShowSubmitMessage(false);
                    setSubmitError(false);
                  }}>
                    <CloseIcon className={classes.icon} />
                  </IconButton>
                ]}
              />
            </Snackbar>
          </div>
        </div>
      </Container>
      <Dialog
        open={dialogType === DialogType.Create || dialogType === DialogType.Update}
        onClose={() => setDialogType(DialogType.None)}
      >
        <FormDialog
          type={dialogType}
          selectedAccountId={selectedAccountId}
          onUpdate={onUpdate}
          onCreate={onCreate}
        />
      </Dialog>
      <Dialog
        open={dialogType === DialogType.Delete}
        onClose={() => setDialogType(DialogType.None)}
      >
        <DialogTitle>
          Delete account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Do you really want to delete the account?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setDialogType(DialogType.None)} color="default">
            Cancel
          </Button>
          <Button onClick={() => deleteAccount()} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};