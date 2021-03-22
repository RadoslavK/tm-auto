import {
  Button,
  colors,
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Icon,
  IconButton,
  makeStyles,
  Snackbar,
  SnackbarContent,
  Typography,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React, {
  useEffect,
  useState, 
} from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';

import type {
  AccountInput,
  SignInFormCreateAccountMutation,
} from '../../../_graphql/__generated__/SignInFormCreateAccountMutation.graphql.js';
import type { SignInFormDeleteAccountMutation } from '../../../_graphql/__generated__/SignInFormDeleteAccountMutation.graphql.js';
import type { SignInFormQuery } from '../../../_graphql/__generated__/SignInFormQuery.graphql.js';
import type { SignInFormSignInMutation } from '../../../_graphql/__generated__/SignInFormSignInMutation.graphql.js';
import type { SignInFormUpdateAccountMutation } from '../../../_graphql/__generated__/SignInFormUpdateAccountMutation.graphql.js';
import { Accounts } from './Accounts.js';
import { SignInFormDialog } from './SignInFormDialog.js';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  'form': {
    // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    width: '100%',
  },
  'icon': {
    fontSize: 20,
  },
  'iconVariant': {
    marginRight: theme.spacing(1),
    opacity: 0.9,
  },
  'margin': {
    margin: theme.spacing(1),
  },
  'message': {
    alignItems: 'center',
    display: 'flex',
  },
  'paper': {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: theme.spacing(8),
  },
  'snackbarContent': {
    backgroundColor: colors.green[600],
  },
  'submit': {
    margin: theme.spacing(3, 0, 2),
  },
}));

export enum SignInFormDialogType {
  Create = 'create',
  None = 'none',
  Update = 'update',
  Delete = 'delete',
}

const signInFormQuery = graphql`
  query SignInFormQuery {
    botState
    lastSignedAccountId
  }
`;

const signInMutation = graphql`
  mutation SignInFormSignInMutation($accountId: ID!) {
    signIn(accountId: $accountId)
  }
`;

const createAccountMutation = graphql`
  mutation SignInFormCreateAccountMutation($account: AccountInput!) {
    createAccount(account: $account) {
      id
    }
  }   
`;

const updateAccountMutation = graphql`
    mutation SignInFormUpdateAccountMutation($id: ID!, $account: AccountInput!) {
        updateAccount(id: $id, account: $account) {
            id
        }
    }
`;

const deleteAccountMutation = graphql`
    mutation SignInFormDeleteAccountMutation($id: ID!) {
        deleteAccount(id: $id) {
            id @deleteRecord
        }
    }
`;

export const SignInForm: React.FC = () => {
  const {
    botState,
    lastSignedAccountId,
  } = useLazyLoadQuery<SignInFormQuery>(signInFormQuery, {});

  const [selectedAccountId, setSelectedAccountId] = useState(lastSignedAccountId);

  useEffect(() => {
    setSelectedAccountId(selectedAccountId);
  }, [selectedAccountId]);

  const classes = useStyles();

  const [submitMessage, setSubmitMessage] = useState<string>();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    document.title = 'TM Auto';
  }, []);

  const [dialogType, setDialogType] = useState(SignInFormDialogType.None);

  const [createAccount] = useMutation<SignInFormCreateAccountMutation>(createAccountMutation);
  const [updateAccount] = useMutation<SignInFormUpdateAccountMutation>(updateAccountMutation);
  const [deleteAccount] = useMutation<SignInFormDeleteAccountMutation>(deleteAccountMutation);
  const [signIn] = useMutation<SignInFormSignInMutation>(signInMutation);

  const disabled = botState === 'Pending' || isSigningIn;

  const onSignIn = (): void => {
    if (selectedAccountId) {
      setIsSigningIn(false);
      signIn({ variables: { accountId: selectedAccountId } });
    }
  };

  const onSubmitForm = (account: AccountInput): void => {
    if (dialogType === SignInFormDialogType.Update) {
      if (selectedAccountId) {
        updateAccount({
          onCompleted: () => {
            setDialogType(SignInFormDialogType.None);
            setSubmitMessage('Account updated');
          },
          variables: { id: selectedAccountId, account },
        });
      }
    } else {
      createAccount({
        onCompleted: (data) => {
          setSelectedAccountId(data.createAccount.id);
          setDialogType(SignInFormDialogType.None);
          setSubmitMessage('Account created');
        },
        variables: { account },
        updater: (store) => {
          const newAccount = store.getRootField('createAccount');
          const root = store.getRoot();
          const newAccounts = root.getLinkedRecords('accounts');

          newAccounts?.push(newAccount);
          root.setLinkedRecords(newAccounts, 'accounts');
        },
      });
    }
  };

  const onDelete = () => {
    if (!selectedAccountId) {
      return;
    }

    deleteAccount({
      onCompleted: () => {
        setDialogType(SignInFormDialogType.None);
        setSubmitMessage('Account deleted');
      },
      variables: { id: selectedAccountId },
      updater: (store) => {
        const root = store.getRoot();
        const oldAccounts = root.getLinkedRecords('accounts');

        if (!oldAccounts) {
          return;
        }

        const newAccounts = oldAccounts.filter(acc => acc.getDataID() !== selectedAccountId);

        root.setLinkedRecords(newAccounts, 'accounts');
      },
    });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            TM Auto
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
              onClick={onSignIn}
              variant="contained">
              Sign In
            </Button>
            <Button
              className={classes.submit}
              color="secondary"
              disabled={disabled}
              fullWidth
              onClick={() => setDialogType(SignInFormDialogType.Create)}
              variant="contained">
              Create account
            </Button>
            <Button
              className={classes.submit}
              color="secondary"
              disabled={disabled || !selectedAccountId}
              fullWidth
              onClick={() => setDialogType(SignInFormDialogType.Update)}
              variant="outlined">
              Update account
            </Button>
            <Button
              className={classes.submit}
              color="secondary"
              disabled={disabled || !selectedAccountId}
              fullWidth
              onClick={() => setDialogType(SignInFormDialogType.Delete)}
              variant="outlined">
              Delete account
            </Button>
            <Snackbar
              anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
              }}
              autoHideDuration={3000}
              onClose={() => {
                setSubmitMessage('');
              }}
              open={!!submitMessage}>
              <SnackbarContent
                action={[
                  <IconButton
                    key="close"
                    color="inherit"
                    onClick={() => {
                      setSubmitMessage('');
                    }}>
                    <CloseIcon className={classes.icon} />
                  </IconButton>,
                ]}
                className={clsx(classes.snackbarContent, classes.margin)}
                message={
                  <span className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    <span>{submitMessage}</span>
                  </span>
                }
              />
            </Snackbar>
          </div>
        </div>
      </Container>
      <Dialog
        onClose={() => setDialogType(SignInFormDialogType.None)}
        open={
          dialogType === SignInFormDialogType.Create ||
          dialogType === SignInFormDialogType.Update
        }
      >
        <SignInFormDialog
          onSubmit={onSubmitForm}
          selectedAccountId={selectedAccountId}
          type={dialogType}
        />
      </Dialog>
      <Dialog
        onClose={() => setDialogType(SignInFormDialogType.None)}
        open={dialogType === SignInFormDialogType.Delete}>
        <DialogTitle>Delete account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete the account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color="primary"
            onClick={() => setDialogType(SignInFormDialogType.None)}>
            Cancel
          </Button>
          <Button color="primary" onClick={onDelete}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
