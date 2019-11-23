import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GetCurrentAccount } from '*/graphql_operations/account.graphql';
import { IGetCurrentAccountQuery } from '../../_types/graphql';
import { getServerShortcut } from '../utils/getServerShortcut';

export const EnsureTitle: React.FC = (props) => {
  const { loading, data } = useQuery<IGetCurrentAccountQuery>(GetCurrentAccount);

  useEffect(() => {
    if (loading || !data) {
      return;
    }

    const { currentAccount } = data;
    document.title = `${currentAccount.username} @ ${getServerShortcut(currentAccount.server)}`;
  }, [data, loading]);

  return <>{props.children}</>;
};