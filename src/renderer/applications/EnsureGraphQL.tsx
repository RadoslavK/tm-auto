import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState, Suspense } from 'react';
import {
  RelayEnvironmentProvider,
} from 'react-relay/hooks';
import { createIpcFetchFunction } from '../_graphql/utils/createIpcFetchFunction.js';
import { IpcClient } from '../_ipc/ipcUtils.js';
import {
  Environment,
  Network,
  RecordSource,
  Store,
} from 'relay-runtime';

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
      const fetchFunction = await createIpcFetchFunction(ipcClient);

      const relayEnvironment = new Environment({
        network: Network.create(fetchFunction),
        store: new Store(new RecordSource()),
        log: event => {
          switch (event.name) {
            case 'network.error': {
              console.error(event.transactionID, event.error);
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
