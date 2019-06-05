import { CssBaseline } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import { INavigationItem } from './_types/INavigationItem';
import { ISideMenuContext, SideMenuContext } from './components/_shared/SideMenu/context/SideMenuContext';
import { SideMenu } from './components/_shared/SideMenu/SideMenu';
import { EnsureSignedIn } from './components/signIn/EnsureSignedIn';
import { navigationItems } from './router/paths';
import { apolloClient } from './settings/apolloClient';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation';
import { MainRoutes } from './components/navigation/MainRoutes';
import './assets/styles.css';

const baseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? undefined : '/app/';

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

const App: React.FunctionComponent = () => {
  const classes = useStyles({});
  const [items, setItems] = useState<NavigationItemsState>([]);
  const sideMenuContext: ISideMenuContext = {
    items,
    setItems,
  };

  return (
    <BrowserRouter basename={baseUrl}>
      <ApolloProvider client={apolloClient}>
        <ApolloHooksProvider client={apolloClient}>
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
        </ApolloHooksProvider>
      </ApolloProvider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
