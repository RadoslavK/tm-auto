import { mergeResolvers } from 'merge-graphql-schemas';
import { IResolvers } from 'graphql-tools';
import { buildingResolvers } from './buildingResolvers';
import { controllerResolvers } from './controllerResolvers';
import { heroResolvers } from './heroResolvers';
import { miscResolvers } from './miscResolvers';
import { settingsResolvers } from './settingsResolvers';
import { villageResolvers } from './villageResolvers';
import { accountResolvers } from './accountResolvers';
import { logsResolvers } from './logsResolvers';

export const resolvers = mergeResolvers([
  villageResolvers as IResolvers,
  controllerResolvers as IResolvers,
  buildingResolvers as IResolvers,
  miscResolvers as IResolvers,
  settingsResolvers as IResolvers,
  heroResolvers as IResolvers,
  accountResolvers as IResolvers,
  logsResolvers as IResolvers,
]);
