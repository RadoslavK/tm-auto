import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main } from './Main';
import { Villages } from './villages/Villages';

const NotFound = () => <h1>Not Found</h1>;

export const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route exact path="/" component={Main} />
    <Route path="/villages" component={Villages} />
    <Route component={NotFound} />
  </Switch>
);
