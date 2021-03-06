import {
  FormControl,
  InputBase,
  InputLabel,
  makeStyles,
  NativeSelect,
  withStyles,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useMemo,
} from 'react';
import {
  useFragment,
  useSubscription,
} from 'react-relay/hooks';
import type {
  GraphQLSubscriptionConfig,
  RecordProxy,
} from 'relay-runtime';

import type { Accounts_accounts$key } from '../../../_graphql/__generated__/Accounts_accounts.graphql.js';
import type { AccountsSubscription } from '../../../_graphql/__generated__/AccountsSubscription.graphql.js';
import { getServerShortcut } from '../../../utils/getServerShortcut.js';

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

type BaseProps = {
  readonly accountsKey: Accounts_accounts$key;
  readonly disabled?: boolean;
  readonly onAccountChanged: (id: string) => void;
  readonly selectedId: string | null | undefined;
};

const accountsSubscription = graphql`
    subscription AccountsSubscription {
        accountsUpdated {
            ...Accounts_accounts
        }
    }
`;

const AccountsContainer: React.FC<BaseProps> = (props) => {
  const subscriptionConfig: GraphQLSubscriptionConfig<AccountsSubscription> = useMemo(() => ({
    subscription: accountsSubscription,
    variables: {},
    updater: (store) => {
      const root = store.getRoot();
      const newAccounts = store.getPluralRootField('accountsUpdated');

      if (!newAccounts) {
        return;
      }

      const oldAccounts = root.getLinkedRecords('accounts');
      root.setLinkedRecords(oldAccounts?.concat(newAccounts as ConcatArray<RecordProxy>), 'accounts');
    },
  }), []);

  useSubscription(subscriptionConfig);

  return (
    <Accounts {...props} />
  );
};

AccountsContainer.displayName = 'AccountsContainer';

export { AccountsContainer as Accounts };

graphql`
    fragment Accounts_account on UserAccount {
        id
        username
        server
    }
`;

const fragmentDefinition = graphql`
  fragment Accounts_accounts on UserAccount @relay(plural: true) {
      ...Accounts_account @relay(mask: false)
  }
`;

const Accounts: React.FC<BaseProps> = ({
  accountsKey,
  disabled,
  onAccountChanged,
  selectedId,
}) => {
  const accounts = useFragment(fragmentDefinition, accountsKey);

  useEffect(() => {
    if (!selectedId && accounts.length > 0) {
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

Accounts.displayName = 'Accounts';