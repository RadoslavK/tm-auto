import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  InMemoryCache,
} from '@apollo/client';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, {
  useEffect,
  useState,
} from 'react';

import { possibleTypes } from '../_graphql/fragmentTypes.json';
import { createIpcLink } from '../_graphql/utils/createIpcLink';
import { IpcClient } from '../_ipc/ipcUtils';
import { createErrorLink } from '../../../_shared/graphql/createErrorLink';

const useStyles = makeStyles({
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '98vh',
  },
});

type Props = {
  readonly socketName: string;
};

export const EnsureGraphQl: React.FC<Props> = ({ children, socketName }) => {
  const [apolloClient, setApolloClient] = useState<ApolloClient<unknown>>();

  const classes = useStyles();

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
            fetchPolicy: 'no-cache',
          },
          watchQuery: {
            errorPolicy: 'none',
            fetchPolicy: 'no-cache',
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
    : (
      <div className={classes.loaderContainer}>
        <CircularProgress size={444} />
      </div>
    );
};