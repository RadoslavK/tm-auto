import { mergeResolvers } from 'merge-graphql-schemas';
import { IResolvers } from 'graphql-tools';
import { buildingResolvers } from './buildingResolvers';
import { controllerResolvers } from './controllerResolvers';
import { heroResolvers } from './heroResolvers';
import { miscResolvers } from './miscResolvers';
import { settingsResolvers } from './settingsResolvers';
import { userResolvers } from './userResolvers';
import { villageResolvers } from './villageResolvers';

export const resolvers = mergeResolvers([
  userResolvers as IResolvers,
  villageResolvers as IResolvers,
  controllerResolvers as IResolvers,
  buildingResolvers as IResolvers,
  miscResolvers as IResolvers,
  settingsResolvers as IResolvers,
  heroResolvers as IResolvers,
]);
