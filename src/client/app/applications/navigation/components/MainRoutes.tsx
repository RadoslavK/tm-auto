import React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { NextTasksExecution } from '../../../_shared/components/nextTaskExecution/NexTasksExecution';
import { Logs } from '../../logs/components/Logs';
import { GeneralSettings } from '../../settings/GeneralSettings';
import { HeroSettings } from '../../settings/hero/HeroSettings';
import { Villages } from '../../villages/components/Villages';

export const MainRoutes: React.FC = () => (
  <div>
    <NextTasksExecution />
    <Switch>
      <Route
        exact
        path="/"
        render={() => <Redirect to="/villages" />}
      />
      <Route
        component={Villages}
        path="/villages"
      />
      <Route
        component={GeneralSettings}
        path="/settings"
      />
      <Route
        component={HeroSettings}
        path="/hero"
      />
      <Route
        component={Logs}
        path="/logs"
      />
      <Redirect to="/villages" />
    </Switch>
  </div>
);
