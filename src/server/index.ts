import { makeExecutableSchema } from 'graphql-tools';
import { resolvers } from './graphql/resolvers';
import { typeDefs } from './graphql/typeDefs';
import { createIpcExecutor } from './createIpcExecutor';
import { createSchemaLink } from './createSchemaLink';
import { loadInfo } from './bootstrap/loadInfo';

const socketName = process.argv[2];

const init = async (): Promise<void> => {
  loadInfo();

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const link = createSchemaLink({
    schema,
  });

  await createIpcExecutor({
    link,
    socketName,
  });
};

init();