import { useEffect } from 'react';

import { getServerShortcut } from '../utils/getServerShortcut';
import { useCurrentAccount } from './useCurrentAccount';

export const useTitle = (): void => {
  const currentAccount = useCurrentAccount();

  useEffect(() => {
    if (!currentAccount) {
      return;
    }

    document.title = `${currentAccount.username} @ ${getServerShortcut(currentAccount.server)}`;
  }, [currentAccount]);
};