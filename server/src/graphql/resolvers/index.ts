import { mergeResolvers } from 'merge-graphql-schemas';
import { villageResolvers } from './villageResolvers';

export const resolvers = mergeResolvers([villageResolvers]);
