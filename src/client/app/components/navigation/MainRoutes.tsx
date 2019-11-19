import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { GeneralSettings } from '../settings/GeneralSettings';
import { HeroSettings } from '../settings/hero/HeroSettings';
import { Villages } from '../villages/Villages';

export const MainRoutes: React.FC = () => (
  <Switch>
    <Route exact path="/" render={() => <Redirect to="/villages" />} />
    <Route path="/villages" component={Villages} />
    <Route path="/settings" component={GeneralSettings} />
    <Route path="/hero" component={HeroSettings} />
  </Switch>
);
