import 'typeface-roboto';

import { ApolloProvider } from '@apollo/react-hooks';
import { CssBaseline } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import { createErrorLink } from '../../_shared/graphql/createErrorLink';
import introspectionQueryResultData from '../graphql/fragmentTypes.json';
import { createIpcLink } from '../graphql/utils/createIpcLink';
import { EnsureTitle } from './components/EnsureTitle';
import { MainRoutes } from './components/navigation/MainRoutes';
import { Navigation } from './components/navigation/Navigation';
import { EnsureSignedIn } from './components/signIn/EnsureSignedIn';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const init = async (): Promise<void> => {
  const ipcLink = await createIpcLink();
  const errorLink = createErrorLink();

  const link = ApolloLink.from([errorLink, ipcLink]);

  const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData });

  const apolloClient = new ApolloClient({
    link,
    cache: new InMemoryCache({ fragmentMatcher }),
    defaultOptions: {
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      },
      mutate: {
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      },
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      },
    },
  });

  const App: React.FC = () => {
    const classes = useStyles({});

    return (
      <Router>
        <ApolloProvider client={apolloClient}>
          <EnsureSignedIn>
            <EnsureTitle>
              <div className={classes.root}>
                <CssBaseline />
                <Navigation />
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  <MainRoutes />
                </main>
              </div>
            </EnsureTitle>
          </EnsureSignedIn>
        </ApolloProvider>
      </Router>
    );
  };

  ReactDOM.render(<App />, document.querySelector('#app'));
};

init();
