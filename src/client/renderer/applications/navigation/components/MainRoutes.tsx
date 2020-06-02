import React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { NextTasksExecution } from '../../../_shared/components/nextTaskExecution/NexTasksExecution';
import { BotActivity } from '../../BotActivity';
import { navigationApps } from './Navigation';

export const MainRoutes: React.FC = () => (
  <div>
    <BotActivity />
    <NextTasksExecution />
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to={navigationApps[0].path} />}
      />
      {navigationApps.map((app) => (
        <Route
          key={app.path}
          component={app.component}
          path={app.path}
        />
      ))}
      <Redirect to={navigationApps[0].path} />
    </Switch>
  </div>
);
