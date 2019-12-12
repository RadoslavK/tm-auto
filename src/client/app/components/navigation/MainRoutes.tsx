import React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { NextTasksExecution } from '../_shared/NexTasksExecution';
import { Logs } from '../logging/Logs';
import { GeneralSettings } from '../settings/GeneralSettings';
import { HeroSettings } from '../settings/hero/HeroSettings';
import { Villages } from '../villages/Villages';

export const MainRoutes: React.FC = () => (
  <div>
    <NextTasksExecution />
    <Switch>
      <Route exact path="/" render={() => <Redirect to="/villages" />} />
      <Route path="/villages" component={Villages} />
      <Route path="/settings" component={GeneralSettings} />
      <Route path="/hero" component={HeroSettings} />
      <Route path="/logs" component={Logs} />
    </Switch>
  </div>
);
