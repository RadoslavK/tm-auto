import 'typeface-roboto';

import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, {
  useEffect,
  useState,
} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { MemoryRouter as Router } from 'react-router-dom';

import { EnsureGraphQl } from './EnsureGraphQl';
import { EnsureTitle } from './EnsureTitle';
import { MainRoutes } from './navigation/components/MainRoutes';
import { Navigation } from './navigation/components/Navigation';
import { GeneralSettings } from './settings/GeneralSettings';
import { EnsureSignedIn } from './signIn/components/EnsureSignedIn';

const useStyles = makeStyles(theme => ({
  content: {
    backgroundColor: theme.palette.background.default,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
}));

export const App: React.FC = () => {
  const classes = useStyles();

  const [socketName, setSocketName] = useState<string>();

  useEffect(() => {
    window.api.getSocketName().then(setSocketName).catch(console.error);
  }, []);

  if (!socketName) {
    return null;
  }

  return (
    <Router>
      <EnsureGraphQl socketName={socketName}>
        <EnsureSignedIn>
          <EnsureTitle>
            <div className={classes.root}>
              <CssBaseline />
              <Navigation />
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <DndProvider backend={HTML5Backend}>
                  <GeneralSettings />
                  <MainRoutes />
                </DndProvider>
              </main>
            </div>
          </EnsureTitle>
        </EnsureSignedIn>
      </EnsureGraphQl>
    </Router>
  );
};