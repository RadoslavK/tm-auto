import { useQuery } from '@apollo/react-hooks';
import {
  FormControl,
  InputBase,
  InputLabel,
  makeStyles,
  NativeSelect,
  withStyles,
} from '@material-ui/core';
import React, { useEffect } from 'react';

import { GetAccounts } from '*/graphql_operations/account.graphql';

import { IGetAccountsQuery } from '../../../_types/graphql';
import { getServerShortcut } from '../../utils/getServerShortcut';

type Props = {
  readonly disabled?: boolean;
  readonly selectedId: string | undefined;
  readonly onSelectedId: (accountId: string) => void;
};

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    display: 'flex',
  },
}));

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
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
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

export const Accounts: React.FC<Props> = (props) => {
  const {
    disabled,
    onSelectedId,
    selectedId,
  } = props;

  const { loading, data } = useQuery<IGetAccountsQuery>(GetAccounts);

  useEffect(() => {
    if (!selectedId && data && data.accounts.length) {
      onSelectedId(data.accounts[0].id);
    } else if (selectedId && data && data.accounts && !data.accounts.some(acc => acc.id === selectedId)) {
      onSelectedId('');
    }
  }, [data, onSelectedId, selectedId]);

  const classes = useStyles();

  if (loading || !data) {
    return null;
  }

  const onOptionChanged = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.currentTarget;
    onSelectedId(value);
  };

  return (
    <FormControl className={classes.formControl} disabled={disabled}>
      <InputLabel>Account</InputLabel>
      <NativeSelect
        value={selectedId}
        onChange={onOptionChanged}
        input={<BootstrapInput />}
      >
        {data.accounts.map(account => (
          <option
            key={account.id}
            value={account.id}
          >
            {account.username} @ {getServerShortcut(account.server)}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};
