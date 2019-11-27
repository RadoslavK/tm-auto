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
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter as Router } from 'react-router-dom';

import { INavigationItem } from '../_types/navigationItem';
import { createErrorLink } from '../../_shared/graphql/createErrorLink';
import { navigationItems } from '../constants/navigationItems';
import introspectionQueryResultData from '../graphql/fragmentTypes.json';
import { createIpcLink } from '../graphql/utils/createIpcLink';
import { EnsureTitle } from './components/EnsureTitle';
import { MainRoutes } from './components/navigation/MainRoutes';
import { Navigation } from './components/navigation/Navigation';
import {
  ISideMenuContext, SideMenuContext,
} from './components/sideMenu/context/sideMenuContext';
import { SideMenu } from './components/sideMenu/SideMenu';
import { EnsureSignedIn } from './components/signIn/EnsureSignedIn';

type NavigationItemsState = readonly INavigationItem[];

const drawerWidth = 240;

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
    const [items, setItems] = useState<NavigationItemsState>([]);
    const sideMenuContext: ISideMenuContext = {
      items,
      setItems,
    };

    return (
      <Router>
        <ApolloProvider client={apolloClient}>
          <EnsureSignedIn>
            <EnsureTitle>
              <SideMenuContext.Provider value={sideMenuContext}>
                <div className={classes.root}>
                  <CssBaseline />
                  <Navigation drawerWidth={drawerWidth} navigationItems={navigationItems}/>
                  <SideMenu width={drawerWidth}/>
                  <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <MainRoutes />
                  </main>
                </div>
              </SideMenuContext.Provider>
            </EnsureTitle>
          </EnsureSignedIn>
        </ApolloProvider>
      </Router>
    );
  };

  ReactDOM.render(<App />, document.querySelector('#app'));
};

init();