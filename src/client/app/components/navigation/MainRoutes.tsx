import React from 'react';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';

import { Logs } from '../logging/Logs';
import { GeneralSettings } from '../settings/GeneralSettings';
import { HeroSettings } from '../settings/hero/HeroSettings';
import { Villages } from '../villages/Villages';

export const MainRoutes: React.FC = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/villages" />} />
    <Route path="/villages" component={Villages} />
    <Route path="/settings" component={GeneralSettings} />
    <Route path="/hero" component={HeroSettings} />
    <Route path="/logs" component={Logs} />
  </Switch>
);
