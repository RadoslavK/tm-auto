import { makeSchema } from 'nexus';
import { join } from 'path';
import { getDirname } from '../utils/getDirname.js';
import * as types from './graphql/index.js';

const {
  NODE_ENV,
  shouldGenerateArtifacts,
} = process.env;

const isDevelopment = NODE_ENV !== 'production';

const __dirname = getDirname(import.meta);

//  TODO add logging
export const schema = makeSchema({
  types,
  shouldGenerateArtifacts: isDevelopment && !!shouldGenerateArtifacts,
  outputs: {
    typegen: join(__dirname, 'graphqlSchema.d.ts'),
    schema: join(__dirname, 'schema.graphql'),
  },
  nonNullDefaults: {
    output: true,
    input: true,
  },
  features: {
    abstractTypeStrategies: {
      resolveType: true,
      isTypeOf: false,
      __typename: false,
    },
  },
});