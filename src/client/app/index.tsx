import { render } from 'react-dom';
import * as React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { MemoryRouter as Router } from 'react-router-dom';
import { createIpcLink } from '../graphql/createIpcLink';

const init = async (): Promise<void> => {
  const link = await createIpcLink();

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  const App: React.FC = () => {
    return (
      <Router>
        <ApolloProvider client={client}>

        </ApolloProvider>
      </Router>
    );
  };

  render(<App/>, document.querySelector('#app'));
};

init();