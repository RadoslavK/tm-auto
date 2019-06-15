import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GeneralSettings } from '../settings/GeneralSettings';
import { HeroSettings } from '../settings/hero/HeroSettings';
import { Villages } from '../villages/Villages';

const NotFound = () => <h1>Not Found</h1>;

export const MainRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/villages" component={Villages} />
    <Route path="/settings" component={GeneralSettings} />
    <Route path="/hero" component={HeroSettings} />
    <Route component={NotFound} />
  </Switch>
);
