import { mergeResolvers } from 'merge-graphql-schemas';
import { userResolvers } from './userResolvers';
import { villageResolvers } from './villageResolvers';

export const resolvers = mergeResolvers([userResolvers, villageResolvers]);
