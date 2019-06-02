import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from './settings/apolloClient';
import { BrowserRouter } from 'react-router-dom';
import { Nav } from './components/Nav';
import { Routes } from './components/Routes';

const baseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? undefined : '/app/';

const App: React.FunctionComponent = () => (
  <BrowserRouter basename={baseUrl}>
    <ApolloProvider client={apolloClient}>
      <Nav />
      <Routes />
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
