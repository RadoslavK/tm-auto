import graphql from 'babel-plugin-relay/macro';
import React, { useEffect } from 'react';

import type { EnsureTitleQuery } from '../_graphql/__generated__/EnsureTitleQuery.graphql.js';
import { useLazyLoadQuery } from '../_shared/hooks/useLazyLoadQuery.js';
import { getServerShortcut } from '../utils/getServerShortcut.js';

const ensureTitleQuery = graphql`
  query EnsureTitleQuery {
      currentAccount {
          server
          username
      }
  }
`;

export const EnsureTitle: React.FC = () => {
  const { currentAccount } = useLazyLoadQuery<EnsureTitleQuery>(ensureTitleQuery, {});

  useEffect(() => {
    document.title = `${currentAccount.username} @ ${getServerShortcut(currentAccount.server)}`;
  }, [currentAccount]);

  return null;
};

EnsureTitle.displayName = 'EnsureTitle';