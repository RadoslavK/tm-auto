import { useQuery } from '@apollo/react-hooks';
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
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import { GetLastSignedAccountId } from '*/graphql_operations/account.graphql';

import {
  BotState,
  ICreateUserAccountInput,
  IGetAccountsQuery,
  IGetLastSignedAccountIdQuery,
  IUpdateUserAccountInput,
} from '../../../_types/graphql';
import { useBotState } from '../../../hooks/useBotState';
import { useCreateAccount } from '../hooks/useCreateAccount';
import { useDeleteAccountMutation } from '../hooks/useDeleteAccountMutation';
import { useGetAccount } from '../hooks/useGetAccount';
import { useSignInMutation } from '../hooks/useSignInMutation';
import { useUpdateAccount } from '../hooks/useUpdateAccount';
import { Accounts } from './Accounts';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  form: {
    // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    width: '100%',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    marginRight: theme.spacing(1),
    opacity: 0.9,
  },
  margin: {
    margin: theme.spacing(1),
  },
  message: {
    alignItems: 'center',
    display: 'flex',
  },
  paper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(8),
  },
  snackbarContent: {
    backgroundColor: green[600],
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type AccountType = IGetAccountsQuery['accounts'][0];

enum DialogType {
  Create = 'create',
  Delete = 'delete',
  None = 'none',
  Update = 'update'
}

type FormDialogProps = {
  readonly onCreate: (newAccountId: string | null) => void;
  readonly onUpdate: (success: boolean) => void;
  readonly selectedAccountId: string;
  readonly type: DialogType;
};

const FormDialog: React.FC<FormDialogProps> = ({
  onCreate,
  onUpdate,
  selectedAccountId,
  type,
}) => {
  const classes = useStyles();

  const account = useGetAccount(selectedAccountId);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [server, setServer] = useState('');

  useEffect(() => {
    if (account && type === DialogType.Update) {
      setUsername(account.username);
      setPassword(account.password);
      setServer(account.server);
    }
  }, [account, type]);

  const newAccount: ICreateUserAccountInput = {
    password,
    server,
    username,
  };

  const updatedAccount: IUpdateUserAccountInput = {
    ...newAccount,
    id: selectedAccountId,
  };

  const { createAccount, createAccountResult } = useCreateAccount(newAccount);
  const { updateAccount, updateAccountResult } = useUpdateAccount(updatedAccount);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const { data, loading } = createAccountResult;

    if (loading || !data) {
      return;
    }

    const newAccountId = data.createAccount;

    setIsSubmitting(false);
    onCreate(newAccountId || null);
  }, [createAccountResult, onCreate]);

  useEffect(() => {
    if (updateAccountResult.loading || !updateAccountResult.data) {
      return;
    }

    setIsSubmitting(false);
    onUpdate(updateAccountResult.data.updateAccount);
  }, [updateAccountResult, onUpdate]);

  const submitAccount = async (): Promise<void> => {
    if (type === DialogType.Update) {
      setIsSubmitting(true);

      await updateAccount();
    } else {
      setIsSubmitting(true);

      await createAccount();
    }
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
          {type === DialogType.Update ? 'Update' : 'Create new'}
        </Typography>
        <div className={classes.form}>
          <TextField
            autoComplete="username"
            autoFocus
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
          <Button
            className={classes.submit}
            color="primary"
            disabled={isSubmitting || !server || !username || !password}
            fullWidth
            onClick={() => submitAccount()}
            variant="contained"
          >
            Submit
          </Button>
        </div>
      </div>
    </Container>
  );
};

const SignInFormContainer: React.FC = () => {
  const { data, loading } = useQuery<IGetLastSignedAccountIdQuery>(GetLastSignedAccountId);

  if (loading || !data) {
    return null;
  }

  return <SignInForm lastSignedInAccountId={data.lastSignedAccountId} />;
};

export { SignInFormContainer as SignInForm };

interface ISignInFormProps {
  readonly lastSignedInAccountId: string | null;
}

const SignInForm: React.FC<ISignInFormProps> = (props) => {
  const {
    lastSignedInAccountId,
  } = props;

  const classes = useStyles();

  const [selectedAccountId, setSelectedAccountId] = useState<AccountType['id']>(lastSignedInAccountId || '');
  const [showSubmitMessage, setShowSubmitMessage] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [hasSubmitError, setHasSubmitError] = useState(false);

  const botState = useBotState();

  const [dialogType, setDialogType] = useState(DialogType.None);

  const executeSignIn = useSignInMutation(selectedAccountId);
  const { deleteAccount, deleteAccountResult } = useDeleteAccountMutation(selectedAccountId);

  useEffect(() => {
    const { data, loading } = deleteAccountResult;

    if (loading || !data) {
      return;
    }

    setDialogType(DialogType.None);
    setSubmitMessage('Account deleted');
    setShowSubmitMessage(true);
  }, [deleteAccountResult]);

  const onUpdate = (success: boolean): void => {
    if (!success) {
      setHasSubmitError(true);
    } else {
      setSubmitMessage('Account updated');
    }

    setDialogType(DialogType.None);
    setShowSubmitMessage(true);
  };

  const onCreate = useCallback((newAccountId: string | null): void => {
    if (!newAccountId) {
      setHasSubmitError(true);
    } else {
      setSelectedAccountId(newAccountId);
      setSubmitMessage('Account created');
    }

    setDialogType(DialogType.None);
    setShowSubmitMessage(true);
  }, []);

  if (!botState) {
    return null;
  }

  const disabled = botState === BotState.Pending;

  return (
    <>
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
            Sign in
          </Typography>
          <div className={classes.form}>
            <Accounts
              disabled={disabled}
              onAccountChanged={setSelectedAccountId}
              selectedId={selectedAccountId}
            />
            <Button
              className={classes.submit}
              color="primary"
              disabled={disabled || !selectedAccountId}
              fullWidth
              onClick={() => executeSignIn()}
              variant="contained"
            >
              Sign In
            </Button>
            <Button
              className={classes.submit}
              color="secondary"
              disabled={disabled}
              fullWidth
              onClick={() => setDialogType(DialogType.Create)}
              variant="contained"
            >
              Create account
            </Button>
            <Button
              className={classes.submit}
              color="secondary"
              disabled={disabled || !selectedAccountId}
              fullWidth
              onClick={() => setDialogType(DialogType.Update)}
              variant="outlined"
            >
              Update account
            </Button>
            <Button
              className={classes.submit}
              color="secondary"
              disabled={disabled || !selectedAccountId}
              fullWidth
              onClick={() => setDialogType(DialogType.Delete)}
              variant="outlined"
            >
              Delete account
            </Button>
            <Snackbar
              anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
              }}
              autoHideDuration={3000}
              onClose={() => {
                setShowSubmitMessage(false);
                setHasSubmitError(false);
              }}
              open={showSubmitMessage}
            >
              <SnackbarContent
                action={[
                  <IconButton
                    key="close"
                    color="inherit"
                    onClick={() => {
                      setShowSubmitMessage(false);
                      setHasSubmitError(false);
                    }}
                  >
                    <CloseIcon className={classes.icon} />
                  </IconButton>,
                ]}
                className={clsx(classes.snackbarContent, classes.margin)}
                message={(
                  <span className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {hasSubmitError && <span>Account already exists</span>}
                    {!hasSubmitError && <span>{submitMessage}</span>}
                  </span>
                )}
              />
            </Snackbar>
          </div>
        </div>
      </Container>
      <Dialog
        onClose={() => setDialogType(DialogType.None)}
        open={dialogType === DialogType.Create || dialogType === DialogType.Update}
      >
        <FormDialog
          onCreate={onCreate}
          onUpdate={onUpdate}
          selectedAccountId={selectedAccountId}
          type={dialogType}
        />
      </Dialog>
      <Dialog
        onClose={() => setDialogType(DialogType.None)}
        open={dialogType === DialogType.Delete}
      >
        <DialogTitle>
          Delete account
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Do you really want to delete the account?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="default"
            onClick={() => setDialogType(DialogType.None)}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={() => deleteAccount()}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
