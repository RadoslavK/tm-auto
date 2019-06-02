import { village } from './village';

export const resolvers = [village].reduce((reduced, resolver) => {
  return {
    Query: {
      ...reduced.Query,
      ...resolver.Query,
    },
    Mutation: {
      ...reduced.Mutation,
      ...resolver.Mutation,
    }
  }
});
