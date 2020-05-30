import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
} from '@apollo/client';
import { InMemoryCache } from '@apollo/client/cache';
import React, {
  useEffect,
  useState,
} from 'react';

import { possibleTypes } from '../_graphql/fragmentTypes.json';
import { createIpcLink } from '../_graphql/utils/createIpcLink';
import { IpcClient } from '../_ipc/ipcUtils';
import { createErrorLink } from '../../../_shared/graphql/createErrorLink';

type Props = {
  readonly socketName: string;
};

export const EnsureGraphQl: React.FC<Props> = ({ children, socketName }) => {
  const [apolloClient, setApolloClient] = useState<ApolloClient<unknown>>();

  useEffect(() => {
    const ipcClient = new IpcClient(socketName);

    const init = async (): Promise<void> => {
      const ipcLink = await createIpcLink(ipcClient);
      const errorLink = createErrorLink();

      const link = ApolloLink.from([errorLink, ipcLink]);

      const client = new ApolloClient({
        cache: new InMemoryCache({ possibleTypes }),
        connectToDevTools: true,
        defaultOptions: {
          mutate: {
            errorPolicy: 'none',
            fetchPolicy: 'no-cache',
          },
          query: {
            errorPolicy: 'none',
            fetchPolicy: 'network-only',
          },
          watchQuery: {
            errorPolicy: 'none',
            fetchPolicy: 'network-only',
          },
        },
        link,
      });

      setApolloClient(client);
    };

    init();

    return () => ipcClient.closeConnection();
  }, [socketName]);

  return apolloClient
    ? (
      <ApolloProvider client={apolloClient}>
        {children}
      </ApolloProvider>
    )
    : null;
};