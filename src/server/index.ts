import 'source-map-support/register';

import { ApolloLink } from '@apollo/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { makeExecutableSchema } from '@graphql-tools/schema';
import serverSchema from '*/serverSchema.graphql';

import { createErrorLink } from '../_shared/graphql/createErrorLink';
import { loadResolvers } from './_graphql';
import { Resolvers } from './_types/graphql.type';
import { createIpcExecutor } from './createIpcExecutor';
import { createSchemaLink } from './createSchemaLink';

const { socketName } = process.env;

if (!socketName) {
  throw new Error('Missing socket name');
}

process.on('warning', (e) => console.warn(e.stack));

const init = async (): Promise<void> => {
  const resolvers = loadResolvers() as Resolvers;

  const schema = makeExecutableSchema({
    typeDefs: serverSchema,
    resolvers,
    logger: { log: (error) => console.warn(error) },
    resolverValidationOptions: {
      requireResolversForArgs: true,
      requireResolversForResolveType: true,
    },
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
