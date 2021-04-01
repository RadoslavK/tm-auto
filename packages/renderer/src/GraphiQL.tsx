import 'graphiql/graphiql.min.css';

import { makeStyles } from '@material-ui/core';
import GraphiQL, {
  Fetcher,
  FetcherResult,
} from 'graphiql';
import React, {
  useEffect,
  useState,
} from 'react';
import ReactDOM from 'react-dom';
import type { Observable } from 'shared/types/observable.js';

import {
  fetchFunction,
  RequestBody,
} from './_graphql/utils/fetchFunction.js';
import { IpcClient } from './_ipc/ipcUtils.js';

const createFetcher = (ipcClient: IpcClient): Fetcher =>
  (graphQLParams) => {
    const request: RequestBody = {
      name: graphQLParams.operationName,
      query: graphQLParams.query,
      variables: graphQLParams.variables,
    };

    const observable: Observable<FetcherResult> = {
      subscribe: (observer) =>
        fetchFunction({
          ipcClient,
          request,
          observer,
          getData: data => (
            {
              data: data.data,
              errors: data.errors && [...data.errors],
            }
          ),
        }),
    };

    //  TODO: they have wrong types, they expect that thing to be callable in 3 ways lol. instead of 1 way being enough
    return observable as any;
  };

const useStyles = makeStyles({
  '@global': {
    body: {
      padding: 0,
      margin: 0,
      minHeight: '100vh',
    },
    '#app': {
      height: '100vh',
    },
  },
});

const App: React.FC = () => {
  useStyles();

  const [fetcher, setFetcher] = useState<Fetcher>();

  useEffect(() => {
    const init = async () => {
      try {
        (window as any).global = globalThis;
        const socketName = await window.api.ipc.getSocketName();
        const ipcClient = new IpcClient(socketName);

        await ipcClient.initConnection();
        setFetcher(() => createFetcher(ipcClient));
      }
      catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  if (!fetcher) {
    return null;
  }

  return <GraphiQL fetcher={fetcher} />;
};

App.displayName = 'App';

ReactDOM.render(<App />, document.getElementById('app'));