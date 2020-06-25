import {
  FormControl,
  InputBase,
  InputLabel,
  NativeSelect,
} from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

import {
  OnAccountsUpdatedDocument,
  OnAccountsUpdatedSubscription,
  OnAccountsUpdatedSubscriptionVariables,
  useGetAccountsQuery,
} from '../../../_graphql/graphqlHooks';
import { getServerShortcut } from '../../../utils/getServerShortcut';

export const useAccounts = () => {
  const {
    data: queryData,
    loading: queryLoading,
    subscribeToMore,
  } = useGetAccountsQuery();

  subscribeToMore<
    OnAccountsUpdatedSubscription,
    OnAccountsUpdatedSubscriptionVariables
  >({
    document: OnAccountsUpdatedDocument,
    updateQuery: (_prev, { subscriptionData: { data } }) => ({
      accounts: data.accountsUpdated,
    }),
  });

  return queryLoading || !queryData ? [] : queryData.accounts;
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    display: 'flex',
    margin: theme.spacing(1),
  },
}));

const BootstrapInput = withStyles((theme) => ({
  input: {
    '&:focus': {
      borderColor: '#80bdff',
      borderRadius: 4,
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
    'backgroundColor': theme.palette.background.paper,
    'border': '1px solid #ced4da',

    'borderRadius': 4,

    // Use the system font instead of the default Roboto font.
    'fontFamily': [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

    'fontSize': 16,

    'padding': '10px 26px 10px 12px',

    'position': 'relative',
    'transition': theme.transitions.create(['border-color', 'box-shadow']),
  },
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
}))(InputBase);

type Props = {
  readonly disabled?: boolean;
  readonly onAccountChanged: (id: string) => void;
  readonly selectedId: string | null | undefined;
};

export const Accounts: React.FC<Props> = ({
  disabled,
  onAccountChanged,
  selectedId,
}) => {
  const accounts = useAccounts();

  useEffect(() => {
    if (!selectedId && accounts.length) {
      onAccountChanged(accounts[0].id);
    } else if (
      selectedId &&
      !accounts.some((account) => account.id === selectedId)
    ) {
      onAccountChanged('');
    }
  }, [accounts, onAccountChanged, selectedId]);

  const classes = useStyles();

  const onOptionChanged = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const accountId = e.currentTarget.value;

    onAccountChanged(accountId);
  };

  return (
    <FormControl className={classes.formControl} disabled={disabled}>
      <InputLabel>Account</InputLabel>
      <NativeSelect
        input={<BootstrapInput />}
        onChange={onOptionChanged}
        value={selectedId || ''}>
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            {account.username} @ {getServerShortcut(account.server)}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
