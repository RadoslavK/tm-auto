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

import { EnsureGraphQL } from './EnsureGraphQL.js';
import { EnsureTitle } from './EnsureTitle.js';
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
  'content': {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  'root': {
    display: 'flex',
  },
  'toolbar': theme.mixins.toolbar,
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <EnsureSignedIn>
          <EnsureTitle>
            <div className={classes.root}>
              <CssBaseline />
              <Navigation />
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <SettingsManagement />
                <MainRoutes />
              </main>
            </div>
          </EnsureTitle>
        </EnsureSignedIn>
      </Router>
    </DndProvider>
  );
};

const AppRoot: React.FC = () => {
  const [socketName, setSocketName] = useState<string>();

  useEffect(() => {
    window.api.ipc.getSocketName().then(setSocketName).catch(console.error);
  }, []);

  return socketName
    ? (
      <EnsureGraphQL socketName={socketName}>
        <App/>
      </EnsureGraphQL>
    )
    : null;
};

export { AppRoot as App };