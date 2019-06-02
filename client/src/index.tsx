import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from './components/Main';
import { AppNew } from './components/AppNew';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from './settings/apolloClient';

const App: React.FunctionComponent = (props) => (
  <ApolloProvider client={apolloClient}>
    <Main />
  </ApolloProvider>
);

// ReactDOM.render(<App />, document.getElementById('app'));
ReactDOM.render(<AppNew />, document.getElementById('app'));
