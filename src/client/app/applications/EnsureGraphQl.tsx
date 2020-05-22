import { ApolloProvider } from '@apollo/react-hooks';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import React, {
  useEffect,
  useState,
} from 'react';

import { createErrorLink } from '../../../_shared/graphql/createErrorLink';
import introspectionQueryResultData from '../../graphql/fragmentTypes.json';
import { createIpcLink } from '../../graphql/utils/createIpcLink';
import { IpcClient } from '../../ipc/ipcUtils';

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

      const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

      const client = new ApolloClient({
        cache: new InMemoryCache({ fragmentMatcher }),
        defaultOptions: {
          mutate: {
            errorPolicy: 'none',
            fetchPolicy: 'network-only',
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