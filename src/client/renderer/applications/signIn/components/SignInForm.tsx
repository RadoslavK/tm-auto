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
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

import { updateQueryCache } from '../../../../../server/utils/graphql';
import {
  AccountInput,
  BotState,
  GetAccountsDocument,
  GetAccountsQuery,
  GetAccountsQueryVariables,
  OnLastSignedAccoutnIdUpdatedDocument,
  OnLastSignedAccoutnIdUpdatedSubscription,
  OnLastSignedAccoutnIdUpdatedSubscriptionVariables,
  useCreateAccountMutation,
  useDeleteAccountMutation,
  useGetLastSignedAccountIdQuery,
  useSignInMutation,
  useUpdateAccountMutation,
} from '../../../_graphql/graphqlHooks';
import { useBotState } from '../../../hooks/useBotState';
import { Accounts } from './Accounts';
import { SignInFormDialog } from './SignInFormDialog';

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
    backgroundColor: green[600],
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

const useLastSignedInAccountId = () => {
  const { data, loading, subscribeToMore } = useGetLastSignedAccountIdQuery();

  subscribeToMore<
    OnLastSignedAccoutnIdUpdatedSubscription,
    OnLastSignedAccoutnIdUpdatedSubscriptionVariables
  >({
    document: OnLastSignedAccoutnIdUpdatedDocument,
    updateQuery: (_prev, { subscriptionData: { data } }) => ({
      lastSignedAccountId: data.lastSignedAccountIdUpdated,
    }),
  });

  return loading || !data ? null : data.lastSignedAccountId;
};

export const SignInForm: React.FC = () => {
  const lastSignedInAccountId = useLastSignedInAccountId();

  const classes = useStyles();

  const [selectedAccountId, setSelectedAccountId] = useState<
    string | undefined | null
  >(lastSignedInAccountId);
  const [submitMessage, setSubmitMessage] = useState<string>();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    document.title = 'TM Auto';
  }, []);

  useEffect(() => {
    setSelectedAccountId(lastSignedInAccountId);
  }, [lastSignedInAccountId]);

  const botState = useBotState();

  const [dialogType, setDialogType] = useState(SignInFormDialogType.None);

  const [createAccount] = useCreateAccountMutation({
    onCompleted: (data) => {
      setSelectedAccountId(data.createAccount.id);
      setDialogType(SignInFormDialogType.None);
      setSubmitMessage('Account created');
    },
  });

  const [updateAccount] = useUpdateAccountMutation({
    onCompleted: () => {
      setDialogType(SignInFormDialogType.None);
      setSubmitMessage('Account updated');
    },
  });

  const [executeSignIn] = useSignInMutation();
  const [deleteAccount] = useDeleteAccountMutation({
    onCompleted: () => {
      setDialogType(SignInFormDialogType.None);
      setSubmitMessage('Account deleted');
    },
  });

  if (!botState) {
    return null;
  }

  const disabled = botState === BotState.Pending || isSigningIn;

  const onSignIn = (): void => {
    if (!selectedAccountId) {
      return;
    }

    setIsSigningIn(false);
    executeSignIn({ variables: { accountId: selectedAccountId } });
  };

  const onSubmitForm = (account: AccountInput): void => {
    if (dialogType === SignInFormDialogType.Update) {
      if (selectedAccountId) {
        updateAccount({ variables: { id: selectedAccountId, account } });
      }
    } else {
      createAccount({
        variables: { account },
        update: (cache, { data }) => {
          if (!data) {
            return;
          }

          updateQueryCache<GetAccountsQuery, GetAccountsQueryVariables>({
            cache,
            query: GetAccountsDocument,
            mergeWithOriginal: ({ accounts }) => ({
              accounts: [...accounts, data.createAccount],
            }),
          });
        },
      });
    }
  };

  const onDelete = () => {
    if (!selectedAccountId) {
      return;
    }

    deleteAccount({
      variables: { id: selectedAccountId },
      update: (cache, { data }) => {
        if (!data) {
          return;
        }

        updateQueryCache<GetAccountsQuery, GetAccountsQueryVariables>({
          cache,
          query: GetAccountsDocument,
          mergeWithOriginal: ({ accounts }) => ({
            accounts: accounts.filter(
              (acc) => acc.id !== data.deleteAccount.id,
            ),
          }),
        });

        cache.evict({ id: cache.identify(data.deleteAccount) });
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
        }>
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
            color="default"
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
