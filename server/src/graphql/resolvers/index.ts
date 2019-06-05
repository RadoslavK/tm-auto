import { mergeResolvers } from 'merge-graphql-schemas';
import { controllerResolvers } from './controllerResolvers';
import { userResolvers } from './userResolvers';
import { villageResolvers } from './villageResolvers';

export const resolvers = mergeResolvers([
  userResolvers,
  villageResolvers,
  controllerResolvers,
]);
