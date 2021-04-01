import graphql from 'babel-plugin-relay/macro';
import React, { useEffect } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import type { EnsureTitleQuery } from '../_graphql/__generated__/EnsureTitleQuery.graphql.js';
import { getServerShortcut } from '../utils/getServerShortcut.js';

const ensureTitleQuery = graphql`
  query EnsureTitleQuery {
      currentAccount {
          server
          username
      }
  }
`;

export const EnsureTitle: React.FC = ({ children }) => {
  const { currentAccount } = useLazyLoadQuery<EnsureTitleQuery>(ensureTitleQuery, {});

  useEffect(() => {
    document.title = `${currentAccount.username} @ ${getServerShortcut(currentAccount.server)}`;
  }, [currentAccount]);

  return <>{children}</>;
};

EnsureTitle.displayName = 'EnsureTitle';