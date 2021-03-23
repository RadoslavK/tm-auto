import { makeSchema } from 'nexus';
import type { BuilderConfigInput } from 'nexus/dist/builder.js';
import { join } from 'path';
import { getDirname } from '../utils/getDirname.js';
import * as types from './graphql/index.js';

const { shouldGenerateArtifacts } = process.env;

const getAutoGenerateOptions = (): Partial<BuilderConfigInput> => {
  if (!shouldGenerateArtifacts) {
    return {};
  }

  const __dirname = getDirname(import.meta);

  return {
    outputs: {
      typegen: join(__dirname, 'graphqlSchema.d.ts'),
      schema: join(__dirname, 'schema.graphql'),
    },
    shouldGenerateArtifacts: true,
  };
};

//  TODO add logging
export const schema = makeSchema({
  types,
  ...getAutoGenerateOptions(),
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