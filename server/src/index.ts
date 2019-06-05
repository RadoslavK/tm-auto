import express from 'express';
import cors from 'cors';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { api } from './api';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';

const app = express();
const port = 3000;
const clientPath = path.join(__dirname, '..', '..', 'client/dist');

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.use(cors());
app.use(express.static(clientPath));

app.use('/api', api);

app.get(['/app/*', '/app'], (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.get('*', (req, res) => {
  res.redirect('/app/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
  console.log(`GraphQL ready at http://localhost:${port}${server.graphqlPath}`);
});
