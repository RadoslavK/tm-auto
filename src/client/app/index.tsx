import { CssBaseline } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { MemoryRouter as Router } from 'react-router-dom';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import 'typeface-roboto';
import { ApolloLink } from 'apollo-link';
import { INavigationItem } from '../_types/INavigationItem';
import { ISideMenuContext, SideMenuContext } from './components/sideMenu/context/SideMenuContext';
import { SideMenu } from './components/sideMenu/SideMenu';
import { EnsureSignedIn } from './components/signIn/EnsureSignedIn';
import { navigationItems } from '../constants/navigationItems';
import { Navigation } from './components/navigation/Navigation';
import { MainRoutes } from './components/navigation/MainRoutes';
import { createIpcLink } from '../graphql/utils/createIpcLink';
import introspectionQueryResultData from '../graphql/fragmentTypes.json';
import { createErrorLink } from '../../_shared/graphql/createErrorLink';

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
          </EnsureSignedIn>
        </ApolloProvider>
      </Router>
    );
  };

  ReactDOM.render(<App />, document.querySelector('#app'));
};

init();