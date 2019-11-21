import React, {
  useEffect,
} from 'react';
import {
  useQuery,
} from '@apollo/react-hooks';
import {
  FormControl,
  InputBase,
  InputLabel,
  makeStyles,
  NativeSelect,
  withStyles,
} from '@material-ui/core';
import {
  GetAccounts,
} from '*/graphql_operations/account.graphql';
import {
  IGetAccountsQuery,
} from '../../../_types/graphql';
import { logException } from '../../../../../_shared/utils/logException';

type AccountType = IGetAccountsQuery['accounts'][0];

type Props = {
  readonly selectedId: string | undefined;
  readonly onSelected: (account: AccountType) => void;
};

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
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
    onSelected,
    selectedId,
  } = props;

  const { loading, data } = useQuery<IGetAccountsQuery>(GetAccounts);

  useEffect(() => {
    if (data && data.accounts.length > 0) {
      onSelected(data.accounts[0]);
    }
  }, [data, onSelected]);

  const classes = useStyles();

  if (loading || !data || !data.accounts.length) {
    return null;
  }

  const onOptionChanged = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.currentTarget;

    const acc = data.accounts.find(x => x.id === value);

    if (!acc) {
      throw logException(`Can not find account with id: ${value}`);
    }

    onSelected(acc);
  };

  return (
    <FormControl className={classes.margin}>
      <InputLabel>Select account</InputLabel>
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
            {account.username} @ {account.server}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};