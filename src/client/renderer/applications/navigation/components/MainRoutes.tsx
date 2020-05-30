import React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { NextTasksExecution } from '../../../_shared/components/nextTaskExecution/NexTasksExecution';
import { navigationApps } from './Navigation';

export const MainRoutes: React.FC = () => (
  <div>
    <NextTasksExecution />
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/villages" />}
      />
      {navigationApps.map((app) => (
        <Route
          key={app.path}
          component={app.component}
          path={app.path}
        />
      ))}
      <Redirect to="/villages" />
    </Switch>
  </div>
);
