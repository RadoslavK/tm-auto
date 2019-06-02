import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from './settings/apolloClient';
import { BrowserRouter } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Routes } from './components/Routes';
import './assets/styles.css';

const baseUrl = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? undefined : '/app/';

const App: React.FunctionComponent = () => (
  <BrowserRouter basename={baseUrl}>
    <ApolloProvider client={apolloClient}>
      <Navigation />
      <Routes />
    </ApolloProvider>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
