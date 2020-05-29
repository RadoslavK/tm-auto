const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { codegen } = require('@graphql-codegen/core');
// eslint-disable-next-line import/no-extraneous-dependencies
const typescript = require('@graphql-codegen/typescript');
// eslint-disable-next-line import/no-extraneous-dependencies
const typescriptResolvers = require('@graphql-codegen/typescript-resolvers');
// eslint-disable-next-line import/no-extraneous-dependencies
const typescriptOperations = require('@graphql-codegen/typescript-operations');
// eslint-disable-next-line import/no-extraneous-dependencies
const graphqlModules = require('@graphql-codegen/typescript-graphql-files-modules');
// eslint-disable-next-line import/no-extraneous-dependencies
const graphqlFragmentMatcher = require('@graphql-codegen/fragment-matcher');
const { loadFiles } = require('graphql-tools');
// eslint-disable-next-line import/no-extraneous-dependencies
const { loadDocuments } = require('@graphql-tools/load');
// eslint-disable-next-line import/no-extraneous-dependencies
const { mergeTypeDefs } = require('@graphql-tools/merge');
// eslint-disable-next-line import/no-extraneous-dependencies
const { GraphQLFileLoader } = require('@graphql-tools/graphql-file-loader');

const commonConfig = {
  maybeValue: 'T | null',
};

const loadServerSchema = async () => {
  const documents = await loadFiles('./src/server/_graphql/resolvers', { extensions: ['graphql'], recursive: true });

  return mergeTypeDefs(documents);
};

const loadClientDocuments = async () =>
  loadDocuments('./src/**/*.graphql', { // load from multiple files using glob
    loaders: [new GraphQLFileLoader()],
  });

const generateResolverTypes = async () => {
  const schema = await loadServerSchema();

  const baseConfig = {
    avoidOptionals: true,
    immutableTypes: true,
  };

  const resolversConfig = {
    ...baseConfig,
    mapperTypeSuffix: 'Model',
    mappers: {
      AutoBuildLogEntryContent: '../_models/logs/content/autoBuild#AutoBuildLogEntryContent',
      AutoUnitsLogEntryContent: '../_models/logs/content/autoUnits#AutoUnitsLogEntryContent',
      BuildingInProgress: '../_models/buildings/inProgress/buildingInProgress#BuildingInProgress',
      HeroInformation: '../_models/hero/hero#Hero',
      LogEntry: '../_models/logs/logEntry#LogEntry',
      Resources: '../_models/misc/resources#Resources',
      TextLogEntryContent: '../_models/logs/content/text#TextLogEntryContent',
    },
  };

  const typeReplacements = Object
    .entries(resolversConfig.mappers)
    .reduce((reduced, entry) => {
      const original = entry[0];
      const path = entry[1];

      const match = /#(.*)/.exec(path);

      if (!match) {
        throw new Error(`Cant find match in the path: ${path}`);
      }

      const mapperName = match[1];

      return ({
        ...reduced,
        [original]: `${mapperName}${resolversConfig.mapperTypeSuffix}`,
      });
    }, {});

  let output = await codegen({
    config: commonConfig,
    pluginMap: {
      typescript,
      typescriptResolvers,
    },
    plugins: [
      { typescript: baseConfig },
      { typescriptResolvers: resolversConfig },
    ],
    schema,
  });

  Object
    .entries(typeReplacements)
    .forEach(([type, replacement]) => {
      const typeRegExp = new RegExp(`: \\b(${type})\\b`, 'g');
      output = output.replace(typeRegExp, `: ${replacement}`);
    });

  fs.writeFileSync('./src/server/_graphql/graphql.type.ts', output);
};

const generateOperationTypes = async () => {
  const schema = await loadServerSchema();
  const documents = await loadClientDocuments();

  const baseConfig = {
    avoidOptionals: true,
    immutableTypes: true,
    skipTypename: true,
  };

  const operationsConfig = {
    ...baseConfig,
  };

  const output = await codegen({
    config: commonConfig,
    documents,
    pluginMap: {
      typescript,
      typescriptOperations,
    },
    plugins: [
      { typescript: baseConfig },
      { typescriptOperations: operationsConfig },
    ],
    schema,
  });

  fs.writeFileSync('./src/client/renderer/_graphql/types/graphql.type.ts', output);
};

const generateGraphqlModules = async () => {
  const schema = await loadServerSchema();
  const documents = await loadClientDocuments();

  const modulesConfig = {
    modulePathPrefix: 'graphql_operations/',
  };

  const output = await codegen({
    documents,
    filename: './src/client/renderer/_graphql/types/graphql_modules.d.ts',
    pluginMap: {
      graphqlModules,
    },
    plugins: [
      { graphqlModules: modulesConfig },
    ],
    schema,
  });

  fs.writeFileSync('./src/client/renderer/_graphql/types/graphql_modules.d.ts', output);
};

const generateGraphqlFragmentTypes = async () => {
  const schema = await loadServerSchema();
  const documents = await loadClientDocuments();

  const matcherConfig = {
    modulePathPrefix: 'graphql_operations/',
  };

  const output = await codegen({
    documents,
    filename: './src/client/renderer/_graphql/fragmentTypes.json',
    pluginMap: {
      graphqlFragmentMatcher,
    },
    plugins: [
      { graphqlFragmentMatcher: matcherConfig },
    ],
    schema,
  });

  fs.writeFileSync('./src/client/renderer/_graphql/fragmentTypes.json', output);
};

generateResolverTypes();
generateOperationTypes();
generateGraphqlFragmentTypes();
generateGraphqlModules();