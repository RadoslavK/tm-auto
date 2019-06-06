import { mergeResolvers } from 'merge-graphql-schemas';
import { buildingResolvers } from './buildingResolvers';
import { controllerResolvers } from './controllerResolvers';
import { userResolvers } from './userResolvers';
import { villageResolvers } from './villageResolvers';

export const resolvers = mergeResolvers([
  userResolvers,
  villageResolvers,
  controllerResolvers,
  buildingResolvers,
]);
