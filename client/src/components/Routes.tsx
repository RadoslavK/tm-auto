import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main } from './Main';

const Yolo: React.FunctionComponent = () => <h1>Nothing to show currently.</h1>;

export const Routes: React.FunctionComponent = () => (
  <Switch>
    <Route path="/" exact component={Main} />
    <Route path="/villages" component={Yolo} />
  </Switch>
);
