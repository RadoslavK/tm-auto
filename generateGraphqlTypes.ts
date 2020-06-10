// eslint-disable-next-line import/no-extraneous-dependencies
import { generate } from '@graphql-codegen/cli';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Types } from '@graphql-codegen/plugin-helpers';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
// eslint-disable-next-line import/no-extraneous-dependencies
import { loadSchema } from '@graphql-tools/load';
import fs from 'fs';
import { printSchema } from 'graphql';

const localSchema = './src/client/renderer/_graphql/**/localSchema/**/*.graphql';
const schema = './src/server/_graphql/**/!(schema).graphql';
const documents = './src/client/renderer/_graphql/**/operations/**/*.graphql';

const hooksPath = './src/client/renderer/_graphql/graphqlHooks.ts';
const serverTypesPath = './src/server/_types/graphql.type.ts';
const fragmentsPath = './src/client/renderer/_graphql/fragmentTypes.json';
const schemaPath = './src/server/_graphql/schema.graphql';

const commonConfig = {
  maybeValue: 'T | undefined',
  preResolveTypes: true,
};

const generateSchemaFile = async (): Promise<void> => {
  const mergedSchema = await loadSchema(schema, {
    loaders: [
      new GraphQLFileLoader(),
    ],
  });

  const printedSchema = printSchema(mergedSchema);

  fs.writeFileSync(schemaPath, printedSchema);
};

const generateResolverTypes = async (): Promise<void> => {
  const baseConfig = {
    avoidOptionals: true,
    immutableTypes: true,
  };

  const resolversConfig = {
    ...baseConfig,
    mapperTypeSuffix: 'Model',
    mappers: {
      BuildingInProgress: '../_models/buildings/inProgress/buildingInProgress#BuildingInProgress',
      BuildingSpot: '../_models/buildings/spots/buildingSpot#BuildingSpot',
      HeroInformation: '../_models/hero/hero#Hero',
      Resources: '../_models/misc/resources#Resources',
      TextLogEntryContent: '../_models/logs/content/text#TextLogEntryContent',
    },
  };

  const typeReplacements = Object
    .entries(resolversConfig.mappers)
    .reduce((reduced, entry) => {
      const original = entry[0];
      const replacementPath = entry[1];

      const match = /#(.*)/.exec(replacementPath);

      if (!match) {
        throw new Error(`Cant find match in the path: ${replacementPath}`);
      }

      const mapperName = match[1];

      return ({
        ...reduced,
        [original]: `${mapperName}${resolversConfig.mapperTypeSuffix}`,
      });
    }, {});

  const outputs: Types.FileOutput[] = await generate({
    schema,
    generates: {
      [serverTypesPath]: {
        plugins: [
          { typescript: baseConfig },
          { 'typescript-resolvers': resolversConfig },
        ],
        config: commonConfig,
      },
    },
  }, false);

  let output = outputs[0].content;

  //  Replace mapper types in nested properties
  Object
    .entries(typeReplacements)
    .forEach(([type, replacement]) => {
      const typeRegExp = new RegExp(`: \\b(${type})\\b`, 'g');
      output = output.replace(typeRegExp, `: ${replacement}`);
    });

  fs.writeFileSync(serverTypesPath, output);
};

const generateOperationTypesAndHooks = async (): Promise<void> => {
  const baseConfig = {
    avoidOptionals: true,
    immutableTypes: true,
    skipTypename: true,
  };

  const config = {
    ...baseConfig,
    withHooks: true,
    withComponent: false,
    withHOC: false,
    reactApolloVersion: 3,
    noGraphQLTag: true,
  };

  await generate({
    documents,
    schema: [schema, localSchema],
    generates: {
      [hooksPath]: {
        plugins: [
          { typescript: baseConfig },
          { 'typescript-operations': config },
          { 'typescript-react-apollo': config },
        ],
        config: commonConfig,
      },
    },
  }, true);
};

const generateGraphqlFragmentTypes = async (): Promise<void> => {
  const matcherConfig = {
    apolloClientVersion: 3,
  };

  await generate({
    documents,
    schema: [schema, localSchema],
    generates: {
      [fragmentsPath]: {
        plugins: [{ 'fragment-matcher': matcherConfig }],
      },
    },
  }, true);
};

generateSchemaFile();
generateResolverTypes();
generateOperationTypesAndHooks();
generateGraphqlFragmentTypes();