import { ApolloLink } from 'apollo-link';
import { makeExecutableSchema } from 'graphql-tools';

import { createErrorLink } from '../_shared/graphql/createErrorLink';
import {
  loadResolvers,
  loadTypeDefs,
} from './_graphql/resolvers';
import { createIpcExecutor } from './createIpcExecutor';
import { createSchemaLink } from './createSchemaLink';

const socketName = process.argv[2];

process.on('warning', e => console.warn(e.stack));

const init = async (): Promise<void> => {
  const typeDefs = await loadTypeDefs();
  const resolvers = await loadResolvers();

  const schema = makeExecutableSchema({
    logger: { log: error => console.warn(error) },
    resolverValidationOptions: {
      requireResolversForArgs: true,
      requireResolversForResolveType: true,
    },
    resolvers,
    typeDefs,
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
