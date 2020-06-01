// eslint-disable-next-line import/no-extraneous-dependencies
import { generate } from '@graphql-codegen/cli';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Types } from '@graphql-codegen/plugin-helpers';
// eslint-disable-next-line import/no-extraneous-dependencies
import fs from 'fs';

const localSchema = './src/client/**/localSchema/**/*.graphql';
const schema = './src/server/**/*.graphql';
const documents = './src/client/**/operations/**/*.graphql';

const hooksPath = './src/client/renderer/_graphql/graphqlHooks.ts';
const serverTypesPath = './src/server/_types/graphql.type.ts';
const fragmentsPath = './src/client/renderer/_graphql/fragmentTypes.json';

const commonConfig = {
  maybeValue: 'T | null',
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

  const outputs: Types.FileOutput[] = await generate({
    documents,
    schema: [schema, localSchema],
    generates: {
      [hooksPath]: {
        plugins: [
          { typescript: baseConfig },
          { 'typescript-operations': config },
          { 'typescript-react-apollo': config },
        ],
      },
    },
  });

  let output = outputs[0].content;

  //  TODO: delete duplicate fragments workaround
  const fragments: string[] = [];

  output = output
    .split(/\r?\n/)
    .reduce((reducedOutput, line) => {
      const match = /(export type .*?Fragment = .*?;)/.exec(line);

      if (!match) {
        return `${reducedOutput}\n${line}`;
      }

      const fragment = match[1];

      if (fragments.includes(fragment)) {
        return reducedOutput;
      }

      fragments.push(fragment);

      return `${reducedOutput}\n${line}`;
    }, '');

  fs.writeFileSync(hooksPath, output);
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

generateResolverTypes();
generateOperationTypesAndHooks();
generateGraphqlFragmentTypes();