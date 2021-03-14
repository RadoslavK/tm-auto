import { makeSchema } from 'nexus';
import { join } from 'path';
import * as types from './graphql';

const isDevelopment = process.env.NODE_ENV !== 'production';

//  TODO add logging
export const createSchema = (shouldGenerateArtifacts: boolean) => makeSchema({
  types,
  shouldGenerateArtifacts: isDevelopment && shouldGenerateArtifacts,
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