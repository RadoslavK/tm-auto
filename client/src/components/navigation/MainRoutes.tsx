import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Villages } from '../villages/Villages';

const NotFound = () => <h1>Not Found</h1>;

export const MainRoutes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/villages" component={Villages} />
    <Route component={NotFound} />
  </Switch>
);
