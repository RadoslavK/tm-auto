import 'typeface-roboto';

import {
  CssBaseline,
  makeStyles, 
} from '@material-ui/core';
import React, {
  useEffect,
  useState, 
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MemoryRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { ErrorBoundary } from '../ErrorBoundary.js';
import { EnsureGraphQL } from './EnsureGraphQL.js';
import { EnsureMainNavigation } from './EnsureMainNavigation.js';
import { EnsureTitle } from './EnsureTitle.js';
import { GraphiQL } from './GraphiQL.js';
import { MainRoutes } from './navigation/components/MainRoutes.js';
import { Navigation } from './navigation/components/Navigation.js';
import { SettingsManagement } from './settings/management/SettingsManagement.js';
import { EnsureSignedIn } from './signIn/components/EnsureSignedIn.js';

const useStyles = makeStyles((theme) => ({
  '@global': {
    html: {
      marginLeft: 'calc(100vw - 100%)',
      marginRight: 0,
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  actionMenu: {
    display: 'flex',
    marginBottom: 8,
  },
}));

export const App: React.FC = () => {
  const classes = useStyles();

  const [socketName, setSocketName] = useState<string>();

  useEffect(() => {
    const init = async () => {
      const socketName = await window.api.ipc.getSocketName();

      setSocketName(socketName);
    };

    init();
  }, []);

  if (!socketName) {
    return null;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <ErrorBoundary>
          <RecoilRoot>
            <EnsureGraphQL socketName={socketName}>
              <EnsureSignedIn>
                <EnsureTitle />
                <EnsureMainNavigation>
                  {(navigationApps) => (
                    <div className={classes.root}>
                      <CssBaseline />
                      <Navigation navigationApps={navigationApps} />
                      <main className={classes.content}>
                        <div className={classes.toolbar} />
                        <div className={classes.actionMenu}>
                          <GraphiQL />
                          <SettingsManagement />
                        </div>
                        <MainRoutes navigationApps={navigationApps} />
                      </main>
                    </div>
                  )}
                </EnsureMainNavigation>
              </EnsureSignedIn>
            </EnsureGraphQL>
          </RecoilRoot>
        </ErrorBoundary>
      </Router>
    </DndProvider>
  );
};

App.displayName = 'App';