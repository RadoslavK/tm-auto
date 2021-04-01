import {
  CircularProgress,
  makeStyles, 
} from '@material-ui/core';
import React, {
  Suspense,
  useEffect,
  useState, 
} from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

import { createIpcFetchFunction } from '../_graphql/utils/createIpcFetchFunction.js';
import { createIpcSubscriptionFunction } from '../_graphql/utils/createIpcSubscriptionFunction.js';
import { IpcClient } from '../_ipc/ipcUtils.js';

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

export const EnsureGraphQL: React.FC<Props> = ({ children, socketName }) => {
  const [relayEnvironment, setRelayEnvironment] = useState<Environment>();
  const classes = useStyles();

  useEffect(() => {
    const ipcClient = new IpcClient(socketName);

    const init = async (): Promise<void> => {
      await ipcClient.initConnection();
      const fetchFunction = createIpcFetchFunction(ipcClient);
      const subscriptionFunction = createIpcSubscriptionFunction(ipcClient);

      const relayEnvironment = new Environment({
        network: Network.create(fetchFunction, subscriptionFunction),
        store: new Store(new RecordSource()),
        log: event => {
          switch (event.name) {
            case 'network.error': {
              console.error(event.transactionID, event.error);
              break;
            }
          }
        },
      });

      setRelayEnvironment(relayEnvironment);
    };

    init();

    return () => ipcClient.closeConnection();
  }, [socketName]);

  return relayEnvironment
    ? (
      <RelayEnvironmentProvider environment={relayEnvironment}>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </RelayEnvironmentProvider>
    ) : (
      <div className={classes.loaderContainer}>
        <CircularProgress size={444} />
      </div>
    );
};

EnsureGraphQL.displayName = 'EnsureGraphQL';