import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Villages } from './villages/Villages';

const NotFound = () => <h1>Not Found</h1>;

export const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/villages" component={Villages} />
    <Route component={NotFound} />
  </Switch>
);
