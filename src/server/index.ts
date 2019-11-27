import { ApolloLink } from 'apollo-link';
import { makeExecutableSchema } from 'graphql-tools';

import { createErrorLink } from '../_shared/graphql/createErrorLink';
import { loadInfo } from './bootstrap/loadInfo';
import { createIpcExecutor } from './createIpcExecutor';
import { createSchemaLink } from './createSchemaLink';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typedefs';

const socketName = process.argv[2];

const init = async (): Promise<void> => {
  loadInfo();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const errorLink = createErrorLink();

  const schemaLink = createSchemaLink({
    schema,
  });

  const link = ApolloLink.from([errorLink, schemaLink]);

  await createIpcExecutor({
    link,
    socketName,
  });
};

init();